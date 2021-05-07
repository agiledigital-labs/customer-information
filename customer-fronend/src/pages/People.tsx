import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  EditButton,
  TextInput,
  Show,
  SimpleShowLayout,
  DateField,
  RichTextField,
  ReferenceManyField,
} from "react-admin";

export const People = (props: any) => (
  <List {...props} hasShow={true}>
    <Datagrid rowClick={"show"}>
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="email" />
      <TextField source="phone" />
      <EditButton basePath="/people" />
    </Datagrid>
  </List>
);

const PeopleTitle = ({ record }: any) => {
  return <span>Person {record ? `"${record.first_name}"` : ""}</span>;
};

export const PeopleEdit = (props: any) => (
  <Edit title={<PeopleTitle />} {...props}>
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Edit>
);

export const PeopleCreate = (props: any) => (
  <Create title="Create a person record" {...props}>
    <SimpleForm>
      <TextInput source="first_name" />
      <TextInput source="last_name" />
      <TextInput source="email" />
      <TextInput source="phone" />
    </SimpleForm>
  </Create>
);

export const PeopleShow = (props: any) => (
  <Show {...props} title={<PeopleTitle />}>
    <SimpleShowLayout>
      <TextField source="first_name" />
      <TextField source="last_name" />
      <TextField source="email" />
      <TextField source="phone" />
      <ReferenceManyField reference={"notes"} target={"user_id"}>
        <Datagrid>
          <RichTextField label={`Notes`} source={"note"}></RichTextField>
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
