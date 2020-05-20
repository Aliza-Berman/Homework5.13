using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Homework5._13.Data
{
    public class PeopleRepository
    {
        private readonly string connectionString;

        public PeopleRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }
        public List<Person> GetAll()
        {
            using (var context = new PeopleContext(connectionString))
            {
                return context.People.ToList();
            }
        }
        public void AddPerson(Person person)
        {
            using (var context = new PeopleContext(connectionString))
            {
                context.People.Add(person);
                context.SaveChanges();
            }
        }
        public void UpdatePerson(Person person)
        {
            using (var context = new PeopleContext(connectionString))
            {
                context.People.Attach(person);
                context.Entry(person).State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public void DeletePerson(int id)
        {
            using (var context = new PeopleContext(connectionString))
            {
                context.Database.ExecuteSqlCommand(
                    "DELETE From People WHERE Id = @id",
                    new SqlParameter("@id", id));

            }
        }
       
    }
}
