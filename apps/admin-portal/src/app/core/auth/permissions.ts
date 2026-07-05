export const Perm = {
  Dashboard: { Read: 'dashboard.read' },
  Enquiry: {
    Read: 'enquiry.read',
    Write: 'enquiry.write',
    Export: 'enquiry.export',
  },
  Content: {
    Read: 'content.read',
    Write: 'content.write',
    Publish: 'content.publish',
  },
  User: {
    Read: 'user.read',
    Write: 'user.write',
    ManagePermissions: 'user.manage_permissions',
  },
} as const;
