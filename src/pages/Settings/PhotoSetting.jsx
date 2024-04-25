import { Table, Dropdown, Modal } from "flowbite-react";
import { usePhotos } from "../../util/Photo/usePhotos";
import { useState } from "react";
import CreatePhotoForm from "../../ui/CreatePhotoForm";

function PhotoSetting() {
  const { photos, isLoading } = usePhotos();
  const [editId, setEditId] = useState(null);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center m-20 ">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="mx-64 my-40 text-center">
      <h1 className="m-10 text-2xl font-semibold">Photo Page</h1>
      <Table striped hoverable className="">
        <Table.Head className="capitalize text-sm">
          <Table.HeadCell>Photo ID</Table.HeadCell>
          <Table.HeadCell>Image</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {photos
            .sort((cur, next) => cur.id - next.id)
            .map((photo) => (
              <Table.Row key={photo.id}>
                <Table.Cell>{photo.id === 0 ? "Header" : photo.id}</Table.Cell>
                <Table.Cell>
                  {photo.image ? (
                    <img
                      src={photo.image}
                      className="w-24 object-cover object-center"
                    />
                  ) : (
                    "/"
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown inline dismissOnClick={false}>
                    <Dropdown.Item onClick={() => setEditId(photo.id)}>
                      Edit
                    </Dropdown.Item>
                    {/* {paragraph.id !== 0 && (
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
                    )} */}
                  </Dropdown>
                </Table.Cell>

                <Modal
                  show={editId === photo.id}
                  onClose={() => setEditId(null)}
                  dismissible
                >
                  <Modal.Header>Edit Paragraph</Modal.Header>
                  <Modal.Body>
                    <CreatePhotoForm
                      photoToEdit={photo}
                      onCloseModal={() => setEditId(null)}
                    />
                  </Modal.Body>
                </Modal>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
      <div className="my-10"></div>
    </div>
  );
}

export default PhotoSetting;
