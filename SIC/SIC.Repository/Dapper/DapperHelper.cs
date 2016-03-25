using Dapper;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace SIC.Repository.Dapper
{
    public class DapperHelper
    {
        #region Properties

        #endregion

        #region Public Methods

        /// <summary>
        /// Realiza uma consulta e retorna uma lista do tipo T.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public static IEnumerable<T> Query<T>(string sql, object parameters = null, int? timeout = null) where T : class
        {
            using (var db = NewConnection())
            {
                return db.Query<T>(sql: sql, param: parameters, commandTimeout: timeout);
            }
        }

        /// <summary>
        /// Realiza uma consulta e retorna um item do tipo T.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public static T Get<T>(string sql, object parameters = null, int? timeout = null) where T : class
        {
            using (var db = NewConnection())
            {
                return db.Query<T>(sql: sql, param: parameters, commandTimeout: timeout).FirstOrDefault();
            }
        }

        /// <summary>
        /// Retorna o valor da primeira linha e primeira coluna da consulta, convertendo o resultado para o tipo T.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public static T ExecuteScalar<T>(string sql, object parameters = null, int? timeout = null)
        {
            using (var db = NewConnection())
            {
                return db.ExecuteScalar<T>(sql: sql, param: parameters, commandTimeout: timeout);
            }
        }

        /// <summary>
        /// Executa um comando no banco de dados.
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="parameters"></param>
        /// <param name="timeout"></param>
        /// <returns></returns>
        public static int Exec(string sql, object parameters = null, int? timeout = null)
        {
            using (var db = NewConnection())
            {
                return db.Execute(sql: sql, param: parameters, commandTimeout: timeout);
            }
        }

        #endregion

        #region Private Methods

        private static IDbConnection NewConnection()
        {
            return new SqlConnection("string conexao");
        }

        #endregion
    }
}