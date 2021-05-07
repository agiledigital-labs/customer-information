import * as React from "react";
import {
  List,
  Datagrid,
  Edit,
  ReferenceField,
  Create,
  SimpleForm,
  TextField,
  DateInput,
  TextInput,
  Show,
  SimpleShowLayout,
  ChipField,
  DateField,
  SingleFieldList,
  EditButton,
} from "react-admin";

export const Employment = (props: any) => (
  <List {...props} hasShow={true}>
    <Datagrid rowClick={"show"}>
      <ReferenceField reference={"organisation"} source={"organisation_id"}>
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField reference={"people"} source={"user_id"}>
        <TextField source="first_name" />
      </ReferenceField>
      <DateField source="start_date" />
      <DateField source="end_date" />
      <EditButton basePath={"/employment"} />
    </Datagrid>
  </List>
);

const EmploymentTitle = ({ record }: any) => {
  return <span>Employment {record ? `"${record.name}"` : ""}</span>;
};

export const EmploymentEdit = (props: any) => (
  <Edit title={<EmploymentTitle />} {...props}>
    <SimpleForm>
      <TextInput source="user_id" />
      <TextInput source="organisation_id" />
      <DateInput source="start_date" type={"timestamp"} />
      <DateInput source="end_date" type={"timestamp"} />
    </SimpleForm>
  </Edit>
);

export const EmploymentCreate = (props: any) => (
  <Create title="Create a person record" {...props}>
    <SimpleForm>
      <TextInput source="user_id" />
      <TextInput source="organisation_id" />
      <DateInput source="start_date" type={"timestamp"} />
      <DateInput source="end_date" type={"timestamp"} />
    </SimpleForm>
  </Create>
);

export const EmploymentShow = (props: any) => (
  <Show {...props} title={<EmploymentTitle />}>
    <SimpleShowLayout>
      <TextField source="user_id" />
      <TextField source="organisation_id" />
      <DateField source="start_date" />
      <DateField source="end_date" />
    </SimpleShowLayout>
  </Show>
);
