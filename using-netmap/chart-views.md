---
title: Personal chart views
keywords: [charts, visuals, display, preferences]
---

# Personal chart views

Use the sliders icon in a chart's header to open **Visual options**. Chart choices are available across NetMap's workspace and Admin charts, including response history in monitoring details. Each chart remembers its own view for your signed-in account, across browsers and devices. Other users keep their own choices.

## Choose a visual

The gallery includes ring, pie, bars, columns, stacked bar, line, area, dot plot, treemap, gauge, number and data table. Choices that do not fit the chart's data are disabled. For example, time series retain chronological order, and overlapping measurements cannot become parts of a total. Changing a visual changes its presentation; it does not change the underlying records or your permissions.

## Choose the elements

Use **Elements** to enable **Show chart**, **Show bars** and **Show legend** independently. For example, keep a ring on its own, combine it with bars without a text legend, or hide the chart and keep just the bars. At least one element stays visible. When Bars is the main chart, NetMap uses that one set of bars rather than adding a duplicate.

Rings and pies do not automatically include bars. A stacked bar has a plain text legend, with extra bars only when you enable them. Pie slices include category/value labels where space allows; small slices retain their full labels and values through focus, hover or tap. **Show values** hides or shows those labels and numeric readouts.

Choose **Bars position** and **Legend position → Top, Bottom, Left or Right** separately. Bars are positioned around the chart; the text legend is positioned around the resulting composition. On a narrow panel, side bars stack above or below the chart to keep standard row spacing and readable values. Save the view to remember all element choices and positions.

Display settings also include values, percentages or both where meaningful, category order and value labels. Status colours retain their meaning. Optional bars use the same sizing, label widths, row spacing and scale as the main Bars view. Columns and their labels are centred.

Older saved ring share bars become an independent Bars element with the same placement. Older stacked bars use a plain legend instead of duplicate tracks. Reset uses the current default, including rings without automatic bars.

A gauge shows the named category's share of the total; it does not infer an uptime target. Number views show the total for additive categories, the latest value for a time series, or the highest value for ranked data. IPAM's Address space alternatives use Used and Free, because reservation and DHCP counts can overlap the used addresses.

## Save, cancel and reset

- Changes preview immediately. **Save my view** saves that chart's type and display options to your account.
- **Cancel** restores the saved view and closes the options. Closing with the X or sliders icon keeps the current preview until you cancel, save or leave the page.
- **Reset this chart** removes its saved override and returns to NetMap's current default.
- **Profile → Preferences → Reset all chart views** restores all your charts to their defaults.

If a save or reset fails, NetMap shows an error and keeps your preview available for retry. If preferences cannot load, retry before saving so an existing view is not accidentally replaced.

Operational address maps, topology canvases, heartbeat strips and small activity indicators inside table rows keep their dedicated controls.
