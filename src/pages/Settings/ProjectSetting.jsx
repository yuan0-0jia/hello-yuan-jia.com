import { Table, Dropdown, Modal } from "flowbite-react";
import { useProjects } from "../../util/Project/useProjects";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateProjectForm from "../../ui/CreateProjectForm";
import { FaCircleExclamation } from "react-icons/fa6";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteProject } from "../../util/Project/useDeleteProject";
import { useCreateProject } from "../../util/Project/useCreateProject";

function ProjectSetting() {
  const { projects, isLoading } = useProjects();

  const { isCreating, createProject } = useCreateProject();
  const { isDeleting, deleteProject } = useDeleteProject();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center m-20 ">
        <h1>Loading...</h1>
      </div>
    );

  function handleDuplication(project) {
    createProject({
      project: `Copy of ${project.project}`,
      desc: project.desc,
      thumbnail: project.thumbnail,
      to: project.to,
      button: project.button,
    });
  }

  return (
    <div className="m-40 text-center">
      <h1 className="m-10 text-2xl font-semibold">Current Projects</h1>
      <Table striped hoverable>
        <Table.Head className="capitalize text-sm">
          <Table.HeadCell>Project</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
          <Table.HeadCell>Thumbnail</Table.HeadCell>
          <Table.HeadCell>To</Table.HeadCell>
          <Table.HeadCell>Button</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {projects.map((project) => (
            <Table.Row key={project.id}>
              <Table.Cell>{project.project}</Table.Cell>
              <Table.Cell>{project.desc}</Table.Cell>
              <Table.Cell>
                <img
                  src={project.thumbnail}
                  className="w-24 object-cover object-center"
                />
              </Table.Cell>
              <Table.Cell>{project.to}</Table.Cell>
              <Table.Cell>{project.button}</Table.Cell>
              <Table.Cell>
                <Dropdown inline dismissOnClick={false}>
                  <Dropdown.Item onClick={() => setEditId(project.id)}>
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setDeleteId(project.id)}>
                    Delete
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDuplication(project)}
                    disabled={isCreating}
                  >
                    Duplicate
                  </Dropdown.Item>
                </Dropdown>
              </Table.Cell>

              <Modal
                show={editId === project.id}
                onClose={() => setEditId(null)}
                dismissible
              >
                <Modal.Header>Edit Project</Modal.Header>
                <Modal.Body>
                  <CreateProjectForm
                    projectToEdit={project}
                    onCloseModal={() => setEditId(null)}
                  />
                </Modal.Body>
              </Modal>

              <Modal
                show={deleteId === project.id}
                onClose={() => setDeleteId(null)}
                dismissible
                popup
              >
                <Modal.Header></Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <FaCircleExclamation className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                    <ConfirmDelete
                      name={project.project}
                      disabled={isDeleting}
                      onCloseModal={() => setDeleteId(null)}
                      onConfirm={() => {
                        setDeleteId(null);
                        deleteProject(project.id);
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
          Add Project
        </Button>

        <Modal show={openModal} onClose={() => setOpenModal(false)} dismissible>
          <Modal.Header>Add Project</Modal.Header>
          <Modal.Body>
            <CreateProjectForm onCloseModal={() => setOpenModal(false)} />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}

export default ProjectSetting;
