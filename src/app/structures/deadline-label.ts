export function deadlineLabel(value: any): string {
    const date = new Date(value && typeof value.toDate === 'function' ? value.toDate() : value);
    if (isNaN(date.getTime())) { return ''; }
    const today = new Date();
    const days = Math.round((
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    ) / 86400000);
    if (days === 0) { return 'Vence hoy'; }
    if (days === 1) { return 'Falta 1 día'; }
    if (days > 1) { return 'Faltan ' + days + ' días'; }
    return days === -1 ? 'Venció hace 1 día' : 'Venció hace ' + Math.abs(days) + ' días';
}
