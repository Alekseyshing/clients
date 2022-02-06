export const contactTooltip = (type, value) => {
  const tooltip = document.createElement('div');
  const tooltipType = document.createElement('span');
  const tooltipValue = document.createElement('a');

  tooltip.classList.add('contacts__tooltip', 'site-tooltip');
  tooltipType.classList.add('contacts__tooltip-type');
  tooltipValue.classList.add('contacts__tooltip-value');

  tooltipType.textContent = type + ': ';
  tooltipValue.textContent = value;

  tooltip.append(tooltipType, tooltipValue);

  return {
    tooltip,
    tooltipType,
    tooltipValue
  }
}