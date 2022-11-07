using Microsoft.AspNetCore.Mvc;

namespace Project2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var result = new List<WeatherForecast>();
            result.Add(new WeatherForecast { Id = 1, Email = "Reza@gmail.com", Name = "RezaAhmadi" });
            result.Add(new WeatherForecast { Id = 1, Email = "akbar@gmail.com", Name = "AkbarEbrahimi" });
            result.Add(new WeatherForecast { Id = 1, Email = "Ali@yahoo.com", Name = "AliHasani" });
            result.Add(new WeatherForecast { Id = 1, Email = "Kamran@gmail.com", Name = "KamranRezaei" });

            return result;
        }
        [HttpDelete]
        public bool Delete(WeatherForecast user)
        {
            // remove user from Database
            return true;
        }
    }
}