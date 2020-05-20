using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Homework5._13.Data
{
    public class PeopleContext : DbContext
    {
        private readonly string _connectionString;

        public PeopleContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        public DbSet<Person> People { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
    }
}
