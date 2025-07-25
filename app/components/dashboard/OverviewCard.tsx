import { Card, BlockStack, Text, Divider, List, InlineStack, Button } from "@shopify/polaris";
import React from "react";

const OverviewCard = () => (
  <Card>
    <BlockStack gap="400">
      <Text variant="headingMd" as="h2">Overview</Text>
      <Divider/>
      <BlockStack gap="200">
        <Text variant="headingSm" as="h3">Secure your Checkout</Text>
        <List>
          <List.Item>
            <InlineStack align="space-between" blockAlign="center">
              <span>
                <b>Checkout Validation</b> - Block spam checkout with advanced conditions (AND/OR - 0$ order, country name,...)
              </span>
              <Button size="slim" variant="primary">Create Rules</Button>
            </InlineStack>
          </List.Item>
          <List.Item>
            <b>Payment Methods Customization</b> - Hide, rename, reorder Payment methods by conditions (email domain, customer tags,...)
          </List.Item>
          <List.Item>
            <b>Shipping Methods Customization</b> - Hide, rename, reorder Shipping methods by conditions (cart total, cart quantity,...)
          </List.Item>
        </List>
      </BlockStack>
    </BlockStack>
  </Card>
);

export default OverviewCard; 