import { useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavGroup,
  NavItem,
  Page,
  PageSidebar,
  PageSidebarBody,
  PageToggleButton,
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import CogIcon from '@patternfly/react-icons/dist/esm/icons/cog-icon';
import SunIcon from '@patternfly/react-icons/dist/esm/icons/sun-icon';
import MoonIcon from '@patternfly/react-icons/dist/esm/icons/moon-icon';
import { getAssessments } from '../data/assessment-registry';
import { useSettings } from '../context/SettingsContext';

export function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { assessmentId } = useParams();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const assessments = getAssessments();
  const { darkMode, toggleDarkMode } = useSettings();

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadToggle>
          <PageToggleButton
            variant="plain"
            aria-label="Global navigation"
            isSidebarOpen={isSidebarOpen}
            onSidebarToggle={() => setSidebarOpen((o) => !o)}
          >
            <BarsIcon />
          </PageToggleButton>
        </MastheadToggle>
        <MastheadBrand>
          <span
            style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            TDP Assessments
          </span>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Button
          variant="plain"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleDarkMode}
          style={{ color: '#fff' }}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </MastheadContent>
    </Masthead>
  );

  const sidebar = (
    <PageSidebar isSidebarOpen={isSidebarOpen}>
      <PageSidebarBody>
        <Nav>
          <NavGroup title="Assessments">
            {assessments.map((a) => (
              <NavItem
                key={a.id}
                isActive={assessmentId === a.id}
                onClick={() => navigate(`/assessments/${a.id}`)}
              >
                {a.shortTitle}
              </NavItem>
            ))}
          </NavGroup>
          <NavGroup title="Configuration">
            <NavItem
              isActive={location.pathname === '/settings'}
              onClick={() => navigate('/settings')}
              icon={<CogIcon />}
            >
              Settings
            </NavItem>
          </NavGroup>
        </Nav>
      </PageSidebarBody>
    </PageSidebar>
  );

  return (
    <Page masthead={masthead} sidebar={sidebar}>
      <Outlet />
    </Page>
  );
}
