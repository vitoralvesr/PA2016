using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace SIC.Repository.Dapper
{
    public class DapperHelper
    {
        #region [ Propriedades ]

        private const string CONNECTION_STRING = @"Data Source=DANI-PC;Initial Catalog=sic_dsv;Integrated Security=True;Connect Timeout=15;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";

        #endregion

        #region [ Helpers ]

        public static List<T> List<T>(string sql, object parameters = null, int? timeout = null) where T : class
        {
            using (var db = NewConnection())
            {
                return db.Query<T>(sql: sql, param: parameters, commandTimeout: timeout).ToList();
            }
        }

        public static T Get<T>(string sql, object parameters = null, int? timeout = null) where T : class
        {
            using (var db = NewConnection())
            {
                return db.Query<T>(sql: sql, param: parameters, commandTimeout: timeout).FirstOrDefault();
            }
        }
       
        public static T ExecuteScalar<T>(string sql, object parameters = null, int? timeout = null)
        {
            using (var db = NewConnection())
            {
                return db.ExecuteScalar<T>(sql: sql, param: parameters, commandTimeout: timeout);
            }
        }
        
        public static int Exec(string sql, object parameters = null, int? timeout = null)
        {
            using (var db = NewConnection())
            {
                return db.Execute(sql: sql, param: parameters, commandTimeout: timeout);
            }
        }

        #endregion

        #region [ Métodos Privados ]

        private static IDbConnection NewConnection()
        {
            return new SqlConnection(CONNECTION_STRING);
        }

        #endregion
    }
}