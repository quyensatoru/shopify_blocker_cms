import {
  Page,
  Layout,
  Card,
  BlockStack,
  Text,
  Button,
  List,
  Box,
  InlineStack,
  Link as PolarisLink,
  Badge,
  Icon,
  Divider,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { CheckCircleIcon, CalendarIcon } from '@shopify/polaris-icons';
import OverviewCard from "../components/dashboard/OverviewCard";
import type { LoaderFunctionArgs } from '@remix-run/node';
import { authenticate } from '../shopify.server';
import { useSelector } from 'react-redux';
import { selectShop } from '../redux/reducers/shop.reducer';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticate.admin(request);
  return null;
};

export default function Dashboard() {
  const [showFaq, setShowFaq] = useState(false);
  const shop = useSelector(selectShop);
  return (
    <Page>
      <BlockStack gap="400">
        {/* Header */}
        <Box paddingBlockEnd="0">
          <TitleBar title="Dev quyen pv" />
          <Box paddingBlockStart="0" paddingBlockEnd="0">
            <Text as="h2" variant="headingXl" tone="base">
              {`Hi. ${shop.name}`}
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              How are you today? Start protecting your checkout by creating more rules!
            </Text>
          </Box>
        </Box>

        {/* Free plan banner */}
        <Card padding="0">
          <Box background="bg-surface-secondary" padding="400" borderRadius="200" borderWidth="025" borderColor="border">
            <InlineStack align="space-between" blockAlign="center">
              <InlineStack gap="200" blockAlign="center">
                <Icon source={CheckCircleIcon} tone="success" />
                <Text variant="bodyMd" as="span" fontWeight="semibold">
                  Free plan activated
                </Text>
              </InlineStack>
              <Button size="slim">View all plans</Button>
            </InlineStack>
            <Box paddingBlockStart="100">
              <Text variant="bodySm" as="p" tone="subdued">
                You are currently on the Free Plan of Blockify Checkout Rules, which allows you to activate one rule of any type.
              </Text>
            </Box>
          </Box>
        </Card>

        {/* Need a hand + What's new */}
        <div className={'Polaris-Layout Polaris-Card__Stretch'}>
           <Layout.Section variant="oneHalf">
              <Card>
                <InlineStack align="space-between">
                  <Text variant="headingSm" as="h3">Need a hand?</Text>
                  <Badge tone="success">Available 24/7</Badge>
                </InlineStack>
                <Text variant="bodySm" as="p">
                  In addition to our extensive help docs, our team is always ready to assist you. If you need anything, don’t hesitate to reach out.
                </Text>
                <InlineStack gap="200">
                  <Button size="slim">Chat with us</Button>
                  <PolarisLink url="#">Read our docs</PolarisLink>
                </InlineStack>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneHalf">
                <Card>
                    <Text variant="headingSm" as="h3">What's New?</Text>
                    <List>
                      <List.Item>
                        <InlineStack gap="100">
                          <Badge tone="success">Released</Badge>
                          <Text as="span">New Checkout Condition</Text>
                          <Text as="span" tone="subdued">15/07/2025</Text>
                        </InlineStack>
                      </List.Item>
                      <List.Item>
                        <InlineStack gap="100">
                          <Badge tone="critical">Coding</Badge>
                          <Text as="span">Cart editor (Plus)</Text>
                          <Text as="span" tone="subdued">Expect: 29/07/2025</Text>
                        </InlineStack>
                      </List.Item>
                    </List>
                    <PolarisLink url="#">Request feature</PolarisLink>
                </Card>
          </Layout.Section>
        </div>

        {/* Last 7 days */}
        <Box paddingBlockStart="0" paddingBlockEnd="0">
          <InlineStack align="end">
            <Button size="slim" variant="tertiary" icon={CalendarIcon}>
              Last 7 days
            </Button>
          </InlineStack>
        </Box>

        {/* Overview + Secure your Checkout */}
        <OverviewCard />

        {/* FAQ section (toggle) */}
        <Card>
          <InlineStack align="space-between" blockAlign="center">
            <Text variant="headingMd" as="h2">Frequently Asked Questions</Text>
            <Button size="slim" onClick={() => setShowFaq((v) => !v)}>
              {showFaq ? "Hide" : "Show"} FAQ
            </Button>
          </InlineStack>
          {showFaq && (
            <List>
              <List.Item>How do I activate more rules?</List.Item>
              <List.Item>How do I contact support?</List.Item>
              <List.Item>How do I upgrade my plan?</List.Item>
            </List>
          )}
        </Card>

        {/* Promotions & Strong Account */}
        <div className={'Polaris-Layout Polaris-Card__Stretch'}>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h3">
                  <span role="img" aria-label="warning">⚠️</span> You might not know this!
                </Text>
                <Text variant="bodyMd" as="p">
                  <b>Did you know that PayPal and Stripe can hold your funds and limit your account?</b>
                </Text>
                <List>
                  <List.Item>They can hold your funds for up to 21 days</List.Item>
                  <List.Item>Limit your accounts</List.Item>
                  <List.Item>Ban your account permanently</List.Item>
                </List>
                <Text variant="bodySm" as="p" tone="subdued">
                  PayPal or Stripe may randomly check if your orders are being delivered.
                </Text>
              </BlockStack>
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneHalf">
            <Card>
              <BlockStack gap="200">
                <Text variant="headingSm" as="h3">
                  <Badge tone="success">Strong Account</Badge>
                </Text>
                <Text variant="bodyMd" as="p">
                  <b>Strong PayPal or Stripe account looks like this:</b>
                </Text>
                <List>
                  <List.Item>No random holds or bans</List.Item>
                  <List.Item>Fewer chargebacks and holds</List.Item>
                  <List.Item>A better relationship between PayPal and Stripe</List.Item>
                </List>
                <Button variant="primary">Yes, help me strengthen my account</Button>
              </BlockStack>
            </Card>
          </Layout.Section>
        </div>
      </BlockStack>
    </Page>
  );
}
