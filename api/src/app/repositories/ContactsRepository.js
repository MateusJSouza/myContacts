const db = require('../../database');

class ContactsRepository {

  // Listar todos os repositórios
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'; // prevenindo SQL Injection
    // Ordenando a lista pelo nome e em ordem ascendente, agrupando (JOIN) com os registros da tabela de categories, onde o "id" é o id da coluna que eu estou fazendo o join e depois o nome da coluna do FROM.
    // ON -> é como se fosse o WHERE, onde o banco irá buscar contato por contato, e para cada um desses contatos, ele irá fazer um SELECT no banco de categories pra verificar na listagem de categorias qual a categoria que tem aquele id
    const rows = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      ORDER BY contacts.name ${direction}
    `);
    return rows;
  }

  // Buscando um contato pelo ID
  async findById(id) {
    const [row] = await db.query(`
      SELECT contacts.*, categories.name AS category_name
      FROM contacts
      LEFT JOIN categories ON categories.id = contacts.category_id
      WHERE contacts.id = $1
    `, [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM contacts WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, email, phone, category_id
  }) {

    // Sempre que precisarmos usar um valor dinâmico, nós colocamos o dólar e um número sequencial
    const [row] = await db.query(`
      INSERT INTO contacts(name, email, phone, category_id)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, email, phone, category_id]);

    return row;
    // E depois fornecemos os valores que serão preenchidos nos dólares sequenciais
    // RETURNING * -> retorna todas as colunas da tabela
  }

  async update(id, {
    name, email, phone, category_id
  }) {
    // [row] -> a variável row sempre retorna um array, então aplicamos a desestruturação
    const [row] = await db.query(`
      UPDATE contacts
      SET name = $1, email = $2, phone = $3, category_id = $4
      WHERE id = $5
      RETURNING *
    `, [name, email, phone, category_id, id]);

    return row;
  }

  async delete(id) {
    // Não estou desestruturando porque o método sempre vai retornar um valor false ou um array vazio
    const deleteOp = await db.query(`
      DELETE FROM contacts WHERE id = $1
    `, [id]);

    return deleteOp;
  }
}

module.exports = new ContactsRepository;
