import React, { useState } from "react";
import {
  Page,
  Card,
  Button,
  Form,
  FormLayout,
  InlineStack,
  Box,
} from "@shopify/polaris";
import { useForm, FieldValues } from "react-hook-form";
import SelectController from "../components/common/SelectController";
import TextFieldController from "../components/common/TextFieldController";
import { useAppBridge } from '@shopify/app-bridge-react';
import { SaveBar } from '@shopify/app-bridge-react';

interface FormData {
  criteria: string,
  ipAddress: string,
  note: string,
  status: "active" | "inactive",
}

// Mock shop list
const shopOptions = [
  { label: "Shop A", value: "shopa123" },
  { label: "Shop B", value: "shopb456" },
  { label: "Shop C", value: "shopc789" },
];

const statusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export default function CreateBlockIPPage() {
  const shopify = useAppBridge();
  const [isDirty, setIsDirty] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isDirty: formDirty },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      criteria: "",
      ipAddress: "",
      note: "",
      status: "active",
    },
  });

  React.useEffect(() => {
    setIsDirty(formDirty);
  }, [formDirty, watch()]);

  const onSubmit = async (data: FormData) => {
    alert("Submitted: " + JSON.stringify(data, null, 2));
    reset();
  };

  const handleDiscard = () => {
    reset();
  };

  return (
    <Page title="Create Block IP Rule" backAction={{ content: "Back", url: "/app/block-ip" }}>
      <Box padding="400">
        <Card>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLayout>
              <TextFieldController<FormData>
                name="criteria"
                control={control}
                label="Criteria"
                placeholder="Enter criteria (e.g. IP, range, ... )"
                rules={{ required: "Criteria is required" }}
                error={errors.criteria?.message}
              />
              <TextFieldController<FormData>
                name="ipAddress"
                control={control}
                label="IP Address"
                placeholder="e.g. 192.168.1.1"
                rules={{ required: "IP Address is required" }}
                error={errors.ipAddress?.message}
              />
              <TextFieldController<FormData>
                name="note"
                control={control}
                label="Note"
                placeholder="Optional note..."
                multiline
              />
              <SelectController<FormData>
                name="status"
                control={control}
                label="Status"
                options={statusOptions}
              />
            </FormLayout>
          </Form>
        </Card>
      </Box>
      <SaveBar
        open={isDirty}
      >
        <button
          variant="primary"
          loading={isSubmitting ? '' : undefined}
          onClick={handleSubmit(onSubmit)}
        ></button>
        <button loading={isSubmitting ? '' : undefined} onClick={handleDiscard}></button>
      </SaveBar>
    </Page>
  );
}
