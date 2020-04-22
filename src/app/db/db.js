const pg = require('pg');
const R =  require('ramda');
//connectionString: 'postgresql://fodxnyyjvemdgi:13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b@ec2-54-195-247-108.eu-west-1.compute.amazonaws.com/dbouih7qphiunh',
const config = {
  host: 'ec2-54-195-247-108.eu-west-1.compute.amazonaws.com',
  user: 'fodxnyyjvemdgi',
  password: '13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b',
  database: 'dbouih7qphiunh',
  port: 5432,
  ssl: {  rejectUnauthorized: false }
};
const client = new pg.Client(config);
// findUserById(1)
fetchNow()

/*
function addUser(name, password, email) {
  const query = {
    text: 'INSERT INTO benutzer(name, passwort, email) VALUES($1, $2, $3)',
    values: [name, password, email]
  }
  client.connect(err => {
    if (err) {
      console.log(err)
    } else {
      executeQuery(query)
    }
  })
  function executeQuery(query) {
    client
      .query(query)
      .then(() => {
        console.log('inserted')
      })
      .catch(err => console.error(err.stack))
      .then(() => {
        console.log('Finished execution, exiting now');
        process.exit();
      });
  }
}
*/
const sql = {
  text: 'SELECT * FROM Benutzer WHERE bid = $1',
  values: [1]
}
function findUserById(id) {

  client.connect(err => {
    if (err) {
      console.log(err)
    } else {
      executeQuey(sql)
    }
  })

  function executeQuey(sql) {
    client
      .query(sql)
      .then((res) => {
        console.log(res.rows)
      })
      .catch(err => console.error(err.stack))
      .then(() => {
        console.log('Finished execution, exiting now');
        process.exit();
      });
  }
}

/*
client.connect();
const da = client.query(query).then(res => {
  return res.rows
}).finally(() => {
  console.log('finally')
  client.end()
});
console.log(da)
*/
//=================================================
/*
async function fetchNow() {
  const client = new pg.Client(config);
  try {
    await client.connect();
    let result = await client.query(sql);
    return R.prop('name', R.head(result.rows));
  } finally {
    client.end()
  }
}
fetchNow().then(res => console.log(res));
*/
async function fetchNow() {

  const client = new pg.Client(config);

  try {
    await client.connect();
    return await client.query(sql);
  } finally {
    client.end()
  }
}

fetchNow().then(res => console.log(res));

/*import {Client} from 'pg';
// connectionString: 'postgresql://fodxnyyjvemdgi:
// 13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b
// @ec2-54-195-247-108.eu-west-1.compute.amazonaws.com/dbouih7qphiunh',
const config = {
  host: 'ec2-54-195-247-108.eu-west-1.compute.amazonaws.com',
  user: 'fodxnyyjvemdgi',
  password: '13b28f11105b263808b74e8b507856aae0dc0a5789b10f5c613b299fd1a4398b',
  database: 'dbouih7qphiunh',
  port: 5432,
  ssl: true
};
export function addUser(name, password, email) {
  const client = new Client(config);
  const query = {
    text: 'INSERT INTO benutzer(name, passwort, email) VALUES($1, $2, $3)',
    values: [name, password, email]
  };
// callback
  client.connect(err => {
    if (err) {
      console.log(err);
    } else {
      executeQuery(query);
    }
  });
  function executeQuery(quer) {// promise
    const re  =
      client
      .query(quer)
      .then(() => {
        console.log('inserted');
        client.end();
      })
      .catch(err => console.error(err.stack))
      .then(() => {
        console.log('Finished execution, exiting now');
      });
  }
}
export function findUserById(id): any {
  const client = new Client(config);
  const query = {
    text: 'SELECT * FROM Benutzer WHERE bid = $1',
    values: [id]
  };
// callback
  client.connect(err => {
    if (err) {
      console.log(err);
    } else {
      return executeQuey(query);
    }
  });
  function executeQuey(quer): any {// promise
    const re =
    client
      .query(quer)
      .then((res) => {
        console.log(res.rows);
        client.end();
        return re;
      })
      .catch(err => console.error(err.stack))
      .then(() => {
        console.log('Finished execution, exiting now');
      });
  }
}
*/
