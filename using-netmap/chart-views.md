---
title: Personal chart views
keywords: [charts, visuals, display, preferences]
---

# Personal chart views

Use the sliders icon in a chart's header to open **Visual options**. Chart choices are available across NetMap's workspace and Admin charts, including response history in monitoring details. Each chart remembers its own view for your signed-in account, across browsers and devices. Other users keep their own choices.

## Choose a visual

The gallery includes ring, pie, bars, columns, stacked bar, line, area, dot plot, treemap, gauge, number and data table. Choices that do not fit the chart's data are disabled. For example, time series retain chronological order, and overlapping measurements cannot become parts of a total. Changing a visual changes its presentation; it does not change the underlying records or your permissions.

Display settings include values, percentages or both where meaningful; category order; legend placement; value labels; and legend share bars. Only settings supported by the selected visual are enabled. Status colours retain their meaning. Bar tracks fill the available chart width, and columns and their labels are centred. Selecting Bars keeps the default bar sizing, label widths and row spacing.

For a chart with a separate legend, choose **Legend position → Top, Bottom, Left or Right**. This applies to rings, pies, stacked bars and multi-series plots. The legend moves around the chart; save the view to remember its placement. Existing beside/below choices continue to work.

A gauge shows the named category's share of the total; it does not infer an uptime target. Number views show the total for additive categories, the latest value for a time series, or the highest value for ranked data. IPAM's Address space alternatives use Used and Free, because reservation and DHCP counts can overlap the used addresses.

## Save, cancel and reset

- Changes preview immediately. **Save my view** saves that chart's type and display options to your account.
- **Cancel** restores the saved view and closes the options. Closing with the X or sliders icon keeps the current preview until you cancel, save or leave the page.
- **Reset this chart** removes its saved override and returns to NetMap's current default.
- **Profile → Preferences → Reset all chart views** restores all your charts to their defaults.

If a save or reset fails, NetMap shows an error and keeps your preview available for retry. If preferences cannot load, retry before saving so an existing view is not accidentally replaced.

Operational address maps, topology canvases, heartbeat strips and small activity indicators inside table rows keep their dedicated controls.
