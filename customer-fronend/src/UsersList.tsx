import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
} from "react-admin";
import BookIcon from "@material-ui/icons/Book";
export const PostIcon = BookIcon;

export const UsersList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="username" />
      <EditButton basePath="/users" />
    </Datagrid>
  </List>
);

const UsersTitle = ({ record }: any) => {
  return <span>User {record ? `"${record.title}"` : ""}</span>;
};

export const UsersEdit = (props: any) => (
  <Edit title={<UsersTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="email" />
      <TextInput source="username" />
    </SimpleForm>
  </Edit>
);

export const UsersCreate = (props: any) => (
  <Create title="Create a Post" {...props}>
    <SimpleForm>
      <TextInput source="email" />
      <TextInput source="username" />
    </SimpleForm>
  </Create>
);
