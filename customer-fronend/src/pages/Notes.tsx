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
  ReferenceInput,
  SelectInput,
  EditButton,
  ReferenceField,
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

export const Notes = (props: any) => (
  <List {...props} hasShow={true}>
    <Datagrid rowClick={"show"}>
      <ReferenceField reference={"people"} source={"user_id"}>
        <TextField source="first_name" />
      </ReferenceField>
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
      <ReferenceField reference={"people"} source={"user_id"}>
        <TextField source="first_name" />
      </ReferenceField>
      <RichTextInput source="note" />
    </SimpleForm>
  </Edit>
);

export const NotesCreate = (props: any) => (
  <Create title="Create a person record" {...props}>
    <SimpleForm>
      <ReferenceInput source="user_id" reference="people">
        <SelectInput optionText="first_name" />
      </ReferenceInput>
      <RichTextInput source="note" />
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
