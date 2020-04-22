import {config} from './db.config';
import {Client} from 'pg';
const client = new Client(config);

export function find2(id) {

  client.connect(err => {
    if (err) {
      console.log(err);
    } else {

      client
        .query('SELECT * FROM Benutzer WHERE bid = $1', [id])
        .then((res) => {
          console.log(res.rows);
        })
        .catch(err, ers => console.error(err.stack, ers.stack))
        .then(() => {
          console.log('Finished execution, exiting now');
        });
    }
  });
}


export async function findUser() {
  try {
    await client.connect();

    const res = await client.query('SELECT now()');
    return console.log(res.name);
  } finally {
    client.end();
  }
}
