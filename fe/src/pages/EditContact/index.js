import { ContactForm } from '../../components/ContactForm';
import { PageHeader } from '../../components/PageHeader';

export function EditContact() {
  return (
    <>
      <PageHeader title="Editar Mateus Jesus" />

      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
