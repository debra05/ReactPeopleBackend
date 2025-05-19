using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Data;
using ReactPeopleBackend.Web.Models;

namespace ReactWithBackend.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;

        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getall")]
        [HttpGet]
        public List<Person> GetAll()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [Route("add")]
        [HttpPost]
        public void AddPerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Add(p);
        }
        [Route("update")]
        [HttpPost]
        public void UpdatePerson(Person p)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Update(p);
        }

        [Route("delete")]
        [HttpPost]
        public void Delete(DeleteViewModel vm)
        {

        }

        [HttpPost]
        [Route("deleteall")]
        public void DeleteAll(DeleteViewModel vm)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.Delete(vm.Ids);

        }
    }
}
