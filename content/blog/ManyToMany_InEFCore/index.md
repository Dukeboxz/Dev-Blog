---
title: Creating Many to Many Relationships in Entity Frameowrk Core.
date: "2020-06-16"
description: "In moving to Entity Framework core I have found a few gotchas.  One is how Entity Framework Core deals with many to many relationships.  This blog post shows what you have to 
do different."
tags: ["development", "Dot Net Core"]

---

In my recent journey to develop a web app using Dot Net core 3.1 and Entity Framework Core version 3 I have found a few gotchas on how things are different from the old Dot Net (which I intend to cover in a future blog post) one of those is that EF Core does not deal with many to many relationships as standard Entity Framework did.  So you have to approach it a bit differently.

In our example we are creating a code first database for a board game club.  The club has members which have many games.  Each game can be owned by a number of members so we have a many to many relationship.  

In the old world we could of just done the classes like they are below, defined them in the dbcontext class and EF would of mapped the tables correctly.

```c#
public class Member
{
    public int MemberId {get; set;}

    public string Name {get; set;}

    public ICollection<Game> Games {get; set; }
}

public class Game 
{
    public int GameId {get; set;}

    public string Name {get; set;}

    public ICollection<Member> members {get; set;}


}

```

Unfortunately this is a feature that is not in EF Core yet although it is an intention to have it in but no firm timescale has been given.  The issue can be tracked [here]( https://github.com/dotnet/efcore/issues/1368)

Until this is done you have to create a linking entity and configure it.  

The first step is to make the joining entity that will link the 2 existing entities together.

```c#

public class MemberGame
{
    public int MemberId {get; set; }
    public Member Member {get; set;}
    public int GameId {get; set;}
    public Game Game {get; set;}
}
```

We then add a one to many relationship with the joining entity to our existing classes.

```c#

public class Member
{
    public int MemberId {get; set;}

    public string Name {get; set;}

    public ICollection<MemberGame> MemberGames {get; set; }
}

public class Game 
{
    public int GameId {get; set;}

    public string Name {get; set;}

    public ICollection<MemberGame> MemberGames {get; set;}


}


```

Once this is done you have to configure the relationship using Ef Core Fluent Api within your dbContext class.  This is done through overriding the OnModelCreating method and and injecting the ModelBuilder class

```c#
    public class AppDbContext : DbContext
    {
        public DbSet<Member> Members {get; set;}
        public DbSet<Game> Games {get; set;}
        public Dbset<MemberGame> MemberGames {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuider.Entity<MemberGame>()
                .HasKey(mg => new {mg.MemberId, mg.GameId});

            modelBuilder.Entity<MemberGame>()
                .HasOne(mg => mg.Member)
                .WithMany(m => m.MemberGames)
                .HasForeignKey(mg=> mg.MemberId); 
            
            modelBuilder.Entity<MemberGame>()
                .HasOne(mg => mg.Game)
                .WithMany(g => g.MemberGames)
                .HasForeignKey(mg => mg.GameId);
        }
    }

```


Once this is done update the database using migrations.  If you do not know how to do this check out link [here](https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli)

Once this is all successfull you would create a new many to many entity in the following way.

Please note this is assuming all games and members are already stored in database and have ids.

```c#

    public void LinkMemberGames(Member member, List<Game> games)
    {
        try{

            using(db = new AppDbContext() )
            {
                foreach(Game game in games)
                {
                    // check if game is already linked with member
                    MemberGame exists = db.MemberGames.FirstOrDefault(x => x.MemberId == member.MemberId && x.GameId == game.GameId);

                    if(exist is null) // Is not in database
                    {
                        MemberGame newRecord = new MemberGame();
                        newRecord.MemberId = member.MemberId; 
                        newRecord.GameId = game.GameId;

                        db.MemberGames.Add(newRecord)
                    }
                }

                db.SaveChanges();
            }

        }catch(exception e){

            throw new Exception()
        }
    }

```

Then if you wanted to get a list of games a member owned you could do it like this:

```c#
      public List<Game> GetMemberOwnedGames(int memberId)
        {
            try
            {
                List<Game> games;
                using (var dbo = new AppDbContext())
                {
                    games = dbo.MemberGames
                        .Where(x => x.MemberId == memberId)
                        .Select(x => x.Game).ToList();

                }

                return games;
            }catch(Exception e)
            {
                throw new Exception("Could not get games");
            }
          
        }

```

I hope this helped in your EF Core journey.  


