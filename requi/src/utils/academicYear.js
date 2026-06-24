/**
 * Academic Year Utility Functions
 * College academic year runs from June to May.
 * e.g., AY 2025–26 = June 1, 2025 → May 31, 2026
 */

// Month labels in academic year order (June → May)
export const AY_MONTH_LABELS = ['JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY'];

// Month indices in academic year order (0-based JS months: 5=Jun, 4=May)
export const AY_MONTH_INDICES = [5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4];

/**
 * Get the academic year for a given date.
 * If month >= June (5), AY starts this calendar year.
 * If month < June, AY started previous calendar year.
 * 
 * @param {Date} [date=new Date()] 
 * @returns {{ startYear: number, endYear: number, label: string, start: Date, end: Date }}
 */
export function getAcademicYear(date = new Date()) {
  const month = date.getMonth(); // 0-indexed
  const year = date.getFullYear();

  const startYear = month >= 5 ? year : year - 1; // >= June
  const endYear = startYear + 1;

  return {
    startYear,
    endYear,
    label: `${startYear}–${String(endYear).slice(-2)}`,
    start: new Date(startYear, 5, 1),    // June 1
    end: new Date(endYear, 4, 31, 23, 59, 59), // May 31 end of day
  };
}

/**
 * Check if a date falls within a specific academic year.
 * @param {Date|string} date 
 * @param {number} startYear - The starting year of the AY (e.g., 2025 for AY 2025–26)
 * @returns {boolean}
 */
export function isInAcademicYear(date, startYear) {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return false;
  const ayStart = new Date(startYear, 5, 1);
  const ayEnd = new Date(startYear + 1, 4, 31, 23, 59, 59);
  return d >= ayStart && d <= ayEnd;
}

/**
 * Get the academic year month index (0=Jun, 1=Jul, ..., 11=May) for a date.
 * @param {Date|string} date 
 * @returns {number} 0-11 in AY order
 */
export function getAYMonthIndex(date) {
  const d = typeof date === 'string' ? new Date(date) : date;
  const jsMonth = d.getMonth(); // 0=Jan
  // June(5)→0, Jul(6)→1, ..., Dec(11)→6, Jan(0)→7, ..., May(4)→11
  return jsMonth >= 5 ? jsMonth - 5 : jsMonth + 7;
}

/**
 * Compute monthly expenditure totals for an academic year from requisitions.
 * Uses `requisition_date` to determine which month a requisition belongs to,
 * and `total_estimated_cost` for the amount.
 * Only counts approved requisitions (status: approved, pending_ed).
 * 
 * @param {Array} requisitions - Array of requisition objects
 * @param {number} startYear - The starting year of the AY
 * @returns {number[]} Array of 12 monthly totals in AY order (JUN→MAY)
 */
export function getMonthlyTotals(requisitions, startYear) {
  const totals = new Array(12).fill(0);

  requisitions.forEach(req => {
    const status = req.status?.toLowerCase();
    if (!['approved', 'pending_ed'].includes(status)) return;

    const dateStr = req.requisition_date || req.created_at;
    if (!dateStr) return;

    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return;
    if (!isInAcademicYear(d, startYear)) return;

    const ayIdx = getAYMonthIndex(d);
    const cost = parseFloat(req.total_estimated_cost || 0);
    totals[ayIdx] += cost;
  });

  return totals;
}

/**
 * Compute total expenditure for an academic year.
 * @param {Array} requisitions 
 * @param {number} startYear 
 * @returns {number}
 */
export function getAYTotalExpenditure(requisitions, startYear) {
  return requisitions.reduce((sum, req) => {
    const status = req.status?.toLowerCase();
    if (!['approved', 'pending_ed'].includes(status)) return sum;

    const dateStr = req.requisition_date || req.created_at;
    if (!dateStr) return sum;

    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return sum;
    if (!isInAcademicYear(d, startYear)) return sum;

    return sum + parseFloat(req.total_estimated_cost || 0);
  }, 0);
}

/**
 * Format a rupee amount to a readable string.
 * @param {number} amount 
 * @returns {string} e.g., "₹12.45L" or "₹85,000"
 */
export function formatRupee(amount) {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Get the academic year date range for filtering requisitions.
 * @param {number} startYear 
 * @returns {{ startDate: string, endDate: string }} ISO date strings
 */
export function getAYDateRange(startYear) {
  return {
    startDate: `${startYear}-06-01`,
    endDate: `${startYear + 1}-05-31`,
  };
}
