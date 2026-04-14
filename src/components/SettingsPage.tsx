import {
  Card,
  CardBody,
  CardTitle,
  Content,
  ContentVariants,
  PageSection,
  Switch,
  Title,
} from '@patternfly/react-core';
import { useSettings } from '../context/SettingsContext';

export function SettingsPage() {
  const { developerMode, setDeveloperMode } = useSettings();

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">Settings</Title>
      </PageSection>
      <PageSection>
        <Card isCompact style={{ maxWidth: '40rem' }}>
          <CardTitle>Developer Mode</CardTitle>
          <CardBody>
            <Content component={ContentVariants.p} style={{ marginBottom: '0.75rem' }}>
              Enables development tools such as the email preview on the results page.
              When active, you can preview the exact email that would be sent to a customer
              without needing a configured mail server.
            </Content>
            <Switch
              id="developer-mode-toggle"
              label="On"
              labelOff="Off"
              isChecked={developerMode}
              onChange={(_event, checked) => setDeveloperMode(checked)}
            />
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
}
