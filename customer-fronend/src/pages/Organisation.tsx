import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  SingleFieldList,
  TextInput,
  Show,
  SimpleShowLayout,
  DateField,
  RichTextField,
  EditButton,
  ReferenceManyField,
  ReferenceField,
} from "react-admin";

export const Organisation = (props: any) => (
  <List {...props} hasShow={true}>
    <Datagrid rowClick={"show"}>
      <TextField source="name" />
      <TextField source="address" />
      <ReferenceManyField
        label={"Employees"}
        reference={"employment"}
        target={"organisation_id"}
      >
        <SingleFieldList>
          <ReferenceField reference={"people"} source={"user_id"}>
            <TextField source="first_name" label={"Employee"} />
          </ReferenceField>
        </SingleFieldList>
      </ReferenceManyField>
      <EditButton basePath={"/organisation"} />
    </Datagrid>
  </List>
);

const OrganisationTitle = ({ record }: any) => {
  return <span>Organisation {record ? `"${record.name}"` : ""}</span>;
};

export const OrganisationEdit = (props: any) => (
  <Edit title={<OrganisationTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="address" />
    </SimpleForm>
  </Edit>
);

export const OrganisationCreate = (props: any) => (
  <Create title="Create a person record" {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="address" />
    </SimpleForm>
  </Create>
);

export const OrganisationShow = (props: any) => (
  <Show {...props} title={<OrganisationTitle />}>
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="address" />
    </SimpleShowLayout>
  </Show>
);
