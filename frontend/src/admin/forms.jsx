import GenericForm from './GenericForm.jsx';

export const ProjectForm = (p) => <GenericForm {...p} schema={[
  { key: 'title', type: 'text', label: 'Title' },
  { key: 'subtitle', type: 'text', label: 'Subtitle' },
  { key: 'description', type: 'textarea', label: 'Short description' },
  { key: 'longDescription', type: 'array', label: 'Long description (array of strings)' },
  { key: 'techStack', type: 'array', label: 'Tech stack (array of strings)' },
  { key: 'links', type: 'object', label: 'Links object { github, live, video, demo }' },
  { key: 'image', type: 'image', label: 'Project image' },
  { key: 'featured', type: 'boolean', label: 'Featured' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;

export const SkillForm = (p) => <GenericForm {...p} schema={[
  { key: 'category', type: 'text', label: 'Category' },
  { key: 'items', type: 'array', label: 'Items (array of strings)' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;

export const ExperienceForm = (p) => <GenericForm {...p} schema={[
  { key: 'role', type: 'text', label: 'Role' },
  { key: 'organization', type: 'text', label: 'Organization' },
  { key: 'startDate', type: 'text', label: 'Start date' },
  { key: 'endDate', type: 'text', label: 'End date' },
  { key: 'location', type: 'text', label: 'Location' },
  { key: 'description', type: 'array', label: 'Description (array)' },
  { key: 'images', type: 'images', label: 'Win images (up to 3)' },
  { key: 'type', type: 'text', label: 'Type (work/internship/leadership/hackathon)', default: 'hackathon' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;

export const EducationForm = (p) => <GenericForm {...p} schema={[
  { key: 'institution', type: 'text', label: 'Institution' },
  { key: 'degree', type: 'text', label: 'Degree' },
  { key: 'field', type: 'text', label: 'Field' },
  { key: 'startDate', type: 'text', label: 'Start' },
  { key: 'endDate', type: 'text', label: 'End' },
  { key: 'score', type: 'text', label: 'Score' },
  { key: 'scoreType', type: 'text', label: 'Score type (CPI/Percentage)', default: 'CPI' },
  { key: 'description', type: 'array', label: 'Description (array)' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;

export const AchievementForm = (p) => <GenericForm {...p} schema={[
  { key: 'title', type: 'text', label: 'Title' },
  { key: 'issuer', type: 'text', label: 'Issuer' },
  { key: 'date', type: 'text', label: 'Date' },
  { key: 'description', type: 'textarea', label: 'Description' },
  { key: 'rank', type: 'text', label: 'Rank' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;

export const ResearchForm = (p) => <GenericForm {...p} schema={[
  { key: 'title', type: 'text', label: 'Title' },
  { key: 'authors', type: 'array', label: 'Authors (array)' },
  { key: 'journal', type: 'text', label: 'Journal' },
  { key: 'year', type: 'text', label: 'Year' },
  { key: 'link', type: 'text', label: 'Link' },
  { key: 'abstract', type: 'textarea', label: 'Abstract' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;

export const CertificationForm = (p) => <GenericForm {...p} schema={[
  { key: 'title', type: 'text', label: 'Title' },
  { key: 'issuer', type: 'text', label: 'Issuer' },
  { key: 'date', type: 'text', label: 'Date' },
  { key: 'credentialId', type: 'text', label: 'Credential ID' },
  { key: 'link', type: 'text', label: 'Link' },
  { key: 'image', type: 'image', label: 'Certificate image' },
  { key: 'order', type: 'text', label: 'Order', default: 0 },
  { key: 'published', type: 'boolean', label: 'Published', default: true },
]} />;
