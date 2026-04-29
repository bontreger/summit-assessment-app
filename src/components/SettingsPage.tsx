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
  const { developerMode, setDeveloperMode, fontSize, setFontSize } = useSettings();

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">Settings</Title>
      </PageSection>
      <PageSection>
        <Card isCompact style={{ maxWidth: '40rem', marginBottom: '1rem' }}>
          <CardTitle>Developer Mode</CardTitle>
          <CardBody>
            <Content component={ContentVariants.p} style={{ marginBottom: '0.75rem' }}>
              Enables development tools such as the email preview on the results page.
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

        <Card isCompact style={{ maxWidth: '40rem' }}>
          <CardTitle>Font Size</CardTitle>
          <CardBody>
            <Content component={ContentVariants.p} style={{ marginBottom: '0.75rem' }}>
              Adjust the base font size for tablet or large-screen presentations. Default is 100%.
            </Content>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="range"
                min={75}
                max={150}
                step={5}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ flex: 1 }}
                aria-label="Font size percentage"
              />
              <span style={{ minWidth: '3.5rem', textAlign: 'right', fontWeight: 600 }}>
                {fontSize}%
              </span>
            </div>
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
}
