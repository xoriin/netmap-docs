---
title: Groups And Roles
sidebar_position: 4
keywords: [admin, groups, roles, custom roles, permissions, RBAC]
---

# Groups And Roles

**Admin → Groups** is where you choose which permissions each role has and create custom roles, called groups. Only a SuperAdmin sees this tab.

## Summary

- **Permission Coverage** ranks each role by how many permissions it has.
- **Roles** counts all roles and the built-in ones, **Custom groups** lists your custom roles, **Permissions** counts the permission keys and the areas they cover, and **Users assigned** names the largest role.

## Change A Role's Permissions

**Role Permissions** shows a panel for each role, with a checkbox, label and description for every permission. SuperAdmin always has full access and can't be changed.

1. Tick or clear the permissions for each role you want to change.
2. Select **Save changes**.

Changes apply to the role's users and their API keys on their next request.

## Create A Custom Group

1. Select **+ New group**.
2. Enter a name that starts with a letter and uses only letters, numbers, `-` and `_`, up to 40 characters.
3. Select **Create**, then tick the group's permissions and select **Save changes**.

You can then choose the group as the **Role** for a user on the [Users](./users.md) tab. Select **✕** on a custom group's panel to delete it.

Design separate roles for read-only, help-desk, security and network work rather than sharing a SuperAdmin account or key. [Permissions](./permissions.md) describes each permission key and which ones work together.

## Related Pages

- [Permissions](./permissions.md)
- [Users](./users.md)
- [API Permissions](../api/permissions.md)
