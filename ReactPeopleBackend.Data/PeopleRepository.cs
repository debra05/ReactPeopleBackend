using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleBackend.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;

        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            using var ctx = new PeopleDataContext(_connectionString);
            return ctx.People.ToList();
        }

        public void Add(Person p)
        {
            using var ctx = new PeopleDataContext(_connectionString);
            ctx.People.Add(p);
            ctx.SaveChanges();
        }
        public void Update(Person p)
        {
            using var ctx = new PeopleDataContext(_connectionString);
            ctx.Database.ExecuteSqlInterpolated($@"  UPDATE People  SET FirstName = {p.FirstName},LastName = {p.LastName}, 
                                                    Age = {p.Age}  WHERE Id = {p.Id}");
        }
        public void Delete(List<int> ids)
        {
            using var ctx = new PeopleDataContext(_connectionString);
            ctx.People.RemoveRange(ctx.People.Where(p => ids.Contains(p.Id)));
            ctx.SaveChanges();
        }



    }
}
