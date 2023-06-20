const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query; // pegando o queryParam de ordenação dinamicamente

    // Listar todos os registros
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  // Obter UM registro
  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not found' }); // Not found
    }

    response.json(contact);
  }

  // Criar novo registro
  async store(request, response) {
    const { name, phone, email, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, phone, email, category_id
    })

    response.json(contact);
  }

  // Editar um registro
  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);

    // Se existir o email e se o id do contato é diferente do id que estamos tentando editar, ele mostra a mensagem de erro, caso contrário, nós criarmos a constante para atualizar as informações
    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email,
      phone,
      category_id,
    });

    response.json(contact);
  }

  // Deletar um registro
  async delete(request, response) {
    const { id } = request.params;

    await ContactsRepository.delete(id);

    // 204: No Content
    response.sendStatus(204);
  }
}

// Singleton
module.exports = new ContactController();
