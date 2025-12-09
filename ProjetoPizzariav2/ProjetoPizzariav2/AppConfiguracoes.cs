using System.Configuration;

namespace ProjetoPizzariav2
{
    public class AppConfiguracoes
    {
        Configuration config;

        public AppConfiguracoes()
        {
            config = System.Configuration.ConfigurationManager.OpenExeConfiguration(ConfigurationUserLevel.None);
        }

        public string GetConnectionString(string key)
        {
            return config.ConnectionStrings.ConnectionStrings[key].ConnectionString;
        }

        public void SaveConnectionString(string key, string value)
        {
            config.ConnectionStrings.ConnectionStrings[key].ConnectionString = value;
            config.ConnectionStrings.ConnectionStrings[key].ProviderName = "MySql.Data.MySqlClient";
            config.Save(ConfigurationSaveMode.Modified);
        }
    }
}
