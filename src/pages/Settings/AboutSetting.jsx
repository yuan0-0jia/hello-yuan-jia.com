import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { Table, Dropdown, Modal } from "flowbite-react";
import { useAbout } from "../../util/About/useAbout";
import { useState } from "react";
import { useCreateAbout } from "../../util/About/useCreateAbout";
import { useDeleteAbout } from "../../util/About/useDeleteAbout";
import { FaCircleExclamation } from "react-icons/fa6";
import CreateAboutForm from "../../ui/CreateAboutForm";

function AboutSetting() {
  const { about, isLoading } = useAbout();

  const { isCreating, createAbout } = useCreateAbout();
  const { isDeleting, deleteAbout } = useDeleteAbout();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center m-20 ">
        <h1>Loading...</h1>
      </div>
    );

  function handleDuplication(paragraph) {
    createAbout({
      ...paragraph,
      id: Number(about.length),
    });
  }

  return (
    <div className="m-40 text-center">
      <h1 className="m-10 text-2xl font-semibold">About Page</h1>
      <Table striped hoverable>
        <Table.Head className="capitalize text-sm">
          <Table.HeadCell>Paragraph</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Photo</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {about
            .sort((cur, next) => cur.id - next.id)
            .map((paragraph) => (
              <Table.Row key={paragraph.id}>
                <Table.Cell>
                  {paragraph.id === 0 ? "Header" : paragraph.id}
                </Table.Cell>
                <Table.Cell>{paragraph.desc}</Table.Cell>
                <Table.Cell>
                  {paragraph.photo ? (
                    <img
                      src={paragraph.photo}
                      className="w-24 object-cover object-center"
                    />
                  ) : (
                    "/"
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown inline dismissOnClick={false}>
                    <Dropdown.Item onClick={() => setEditId(paragraph.id)}>
                      Edit
                    </Dropdown.Item>
                    {paragraph.id !== 0 && (
                      <>
                        <Dropdown.Item
                          onClick={() => setDeleteId(paragraph.id)}
                        >
                          Delete
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDuplication(paragraph)}
                          disabled={isCreating}
                        >
                          Duplicate
                        </Dropdown.Item>
                      </>
                    )}
                  </Dropdown>
                </Table.Cell>

                <Modal
                  show={editId === paragraph.id}
                  onClose={() => setEditId(null)}
                  dismissible
                >
                  <Modal.Header>Edit Paragraph</Modal.Header>
                  <Modal.Body>
                    <CreateAboutForm
                      paragraphToEdit={paragraph}
                      onCloseModal={() => setEditId(null)}
                    />
                  </Modal.Body>
                </Modal>

                <Modal
                  show={deleteId === paragraph.id}
                  onClose={() => setDeleteId(null)}
                  dismissible
                  popup
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Body>
                    <div className="text-center">
                      <FaCircleExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                      <ConfirmDelete
                        name={`Paragraph ${paragraph.id}`}
                        disabled={isDeleting}
                        onCloseModal={() => setDeleteId(null)}
                        onConfirm={() => {
                          setDeleteId(null);
                          deleteAbout(paragraph.id);
                        }}
                      />
                    </div>
                  </Modal.Body>
                </Modal>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <div className="my-10">
        <Button type="small" onClick={() => setOpenModal(true)}>
          Add Paragraph
        </Button>

        <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible>
          <Modal.Header>Add Paragraph</Modal.Header>
          <Modal.Body>
            <CreateAboutForm onCloseModal={() => setOpenModal(false)} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default AboutSetting;
