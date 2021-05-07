import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  TextField,
  DateInput,
  TextInput,
  Show,
  SimpleShowLayout,
  DateField,
  RichTextField,
  EditButton,
} from "react-admin";

export const Notes = (props: any) => (
  <List {...props} hasShow={true}>
    <Datagrid rowClick={"show"}>
      <TextField source="user_id" />
      <TextField source="note" />
      <DateField source="timestamp" />
      <EditButton basePath="/notes" />
    </Datagrid>
  </List>
);

const NotesTitle = ({ record }: any) => {
  return <span>Notes for user {record ? `"${record.user_id}"` : ""}</span>;
};

export const NotesEdit = (props: any) => (
  <Edit title={<NotesTitle />} {...props}>
    <SimpleForm>
      <TextInput source="user_id" />
      <TextInput source="note" />
      <DateInput source="timestamp" type={"timestamp"} />
    </SimpleForm>
  </Edit>
);

export const NotesCreate = (props: any) => (
  <Create title="Create a person record" {...props}>
    <SimpleForm>
      <TextInput source="user_id" />
      <TextInput source="note" />
      <DateInput source="timestamp" type={"timestamp"} />
    </SimpleForm>
  </Create>
);

export const NotesShow = (props: any) => (
  <Show {...props} title={<NotesTitle />}>
    <SimpleShowLayout>
      <TextField source="user_id" />
      <TextField source="note" />
      <DateField source="timestamp" />
    </SimpleShowLayout>
  </Show>
);
