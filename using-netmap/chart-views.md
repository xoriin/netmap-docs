---
title: Personal chart views
keywords: [charts, visuals, display, preferences]
---

# Personal chart views

Use the sliders icon in a chart's header to open **Visual options**. Chart choices are available across NetMap's workspace and Admin charts, including response history in monitoring details. Each chart remembers its own view for your signed-in account, across browsers and devices. Other users keep their own choices.

## Choose a visual

The gallery includes ring, pie, bars, columns, stacked bar, line, area, dot plot, treemap, gauge, number and data table. Choices that do not fit the chart's data are disabled. For example, time series retain chronological order, and overlapping measurements cannot become parts of a total. Changing a visual changes its presentation; it does not change the underlying records or your permissions.

## Choose the elements

Use **Elements** to show the chart and optionally add Bars or a text legend. Bars already include names and values, so **Show legend** is hidden while bars are visible. Selecting Bars as the main chart uses one labelled bar list. At least one element remains visible.

The **Arrangement** arrow buttons move either element above, below, left or right of the other. For example, choose “Number left of Bars” or “Bars above Number”. The two rows describe the same layout from each element’s perspective. On narrow panels, side bars stack to preserve readable rows.

For Ring and Number views, **Value to display** selects the total or a named category. **Values → Values, Percentages, or Values and percentages** changes the actual readout, including when no legend is visible. Ring readouts show both formats on separate lines when both are selected. Total percentages are 100%; choose a category such as Online to show its share instead.

Pie slices include category/value labels where space allows; small slices retain full values through focus, hover or tap. **Show values** controls labels and readouts where applicable. Optional bars share the standard bar sizing, spacing and scale.

Overview’s Network health keeps two independently configurable visuals: the health ring and the health breakdown. Each keeps its own visual type and saved preferences. In either visual’s options, use the panel arrangement arrows to place it above, below, left or right of the other. Save my view remembers the placement; Cancel restores the saved placement, and Reset this chart also restores the default arrangement. Selecting the original visual type retains its original dimensions and spacing.

A gauge shows the named category's share of the total; it does not infer an uptime target. Number views show the total for additive categories, the latest value for a time series, or the highest value for ranked data. IPAM's Address space alternatives use Used and Free, because reservation and DHCP counts can overlap the used addresses.

## Save, cancel and reset

- Changes preview immediately. **Save my view** saves that chart's type and display options to your account.
- **Cancel** restores the saved view and closes the options. Closing with the X or sliders icon keeps the current preview until you cancel, save or leave the page.
- **Reset this chart** removes its saved override and returns to NetMap's current default.
- **Profile → Preferences → Reset all chart views** restores all your charts to their defaults.

If a save or reset fails, NetMap shows an error and keeps your preview available for retry. If preferences cannot load, retry before saving so an existing view is not accidentally replaced.

Operational address maps, topology canvases, heartbeat strips and small activity indicators inside table rows keep their dedicated controls.

Chart legends use the available width, with their values aligned at the far edge. Bar-only views start near the header and keep the same bar thickness and row spacing as their default view.

Ring breakdowns such as Devices by type start with labelled bars beside the ring. You can turn those bars off or reposition them in Visual options; your saved choices take priority. Reset restores the ring-and-bars default. Overview’s standalone health ring and separate health breakdown remain independent.

IPAM Address space defaults to a gauge showing the used share, with Used and Free bars on the right. Visual options still lets you change the chart, hide the bars or move them; Reset restores this layout. Reserved addresses and DHCP leases remain separate summary metrics.

Column charts show non-zero totals above each column by default, on a subtle background with small rounded corners. For stacked columns the value is the combined total; hover or focus still shows the individual series. Turn off Show values to hide the labels in your saved view.
