import { Card, BlockStack, Box, Divider } from "@shopify/polaris";
import React from "react";
import BlockIPRow from "./BlockIPRow";

export default function BlockIPTable({ data }: { data: any[] }) {
  return (
    <Card>
      <BlockStack gap="0">
        {/* Header */}
        <Box paddingBlock="100" background="bg-surface-secondary">
          <BlockStack gap="0"/>
        </Box>
        <Divider/>
        {data.length === 0 ? (
          <Box padding="400" as="div">
            <span>No blocked IPs found.</span>
          </Box>
        ) : (
          data.map(row => <BlockIPRow key={row.id} {...row} />)
        )}
      </BlockStack>
    </Card>
  );
} 