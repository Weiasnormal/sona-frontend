
// Sorting utilities for music tracks
// This utility provides efficient sorting functionality for music lists
// Includes both Merge Sort (optimized for large datasets) and Quick Sort algorithms



// Sort order options

export enum SortOrder {
  ASCENDING = 'ascending',
  DESCENDING = 'descending'
}


// Sort field options

export enum SortField {
  TITLE = 'title',
  ARTIST = 'artist',
  ALBUM = 'album'
}


// Sort option type for dropdown

export interface SortOption {
  label: string;
  field: SortField;
  order: SortOrder;
}


// Available sort options for dropdown filter
export const SORT_OPTIONS: SortOption[] = [
  { label: 'Song Name (A-Z)', field: SortField.TITLE, order: SortOrder.ASCENDING },
  { label: 'Song Name (Z-A)', field: SortField.TITLE, order: SortOrder.DESCENDING },
];



// Merge Sort implementation for music tracks
// tracks - Array of tracks to sort
// field - Field to sort by (title, artist, or album)
// order - Sort order (ascending or descending)

export function mergeSort<T extends Record<string, any>>(
  tracks: T[], 
  field: SortField, 
  order: SortOrder
): T[] {

  // Create a copy to avoid mutating the original array
  const tracksCopy = [...tracks];
  
  // Base case: arrays with 0 or 1 element are already sorted
  if (tracksCopy.length <= 1) {
    return tracksCopy;
  }
  
  // Split the array into two halves
  const middle = Math.floor(tracksCopy.length / 2);
  const left = tracksCopy.slice(0, middle);
  const right = tracksCopy.slice(middle);
  
  // Recursively sort both halves and merge them
  return merge(
    mergeSort(left, field, order),
    mergeSort(right, field, order),
    field,
    order
  );
}

// Merge function for Merge Sort
// Combines two sorted arrays into a single sorted array

function merge<T extends Record<string, any>>(
  left: T[], 
  right: T[], 
  field: SortField, 
  order: SortOrder
): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and merge them in sorted order
  while (leftIndex < left.length && rightIndex < right.length) {
    const valueA = getFieldValue(left[leftIndex], field);
    const valueB = getFieldValue(right[rightIndex], field);
    const comparison = compareValues(valueA, valueB, order);
    
    if (comparison <= 0) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
// Add any remaining elements from both arrays
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Get the value of a field from an object, handling undefined/null values

function getFieldValue<T extends Record<string, any>>(obj: T, field: SortField): string {

// For album field, provide a fallback if it doesn't exist
  if (field === SortField.ALBUM && (obj[field] === undefined || obj[field] === null)) {
    return '';
  }
  
// Return the field value or empty string if undefined/null
  return (obj[field] || '').toString();
}


// Compare two values based on sort order

function compareValues(a: string, b: string, order: SortOrder): number {
  const valueA = a.toLowerCase();
  const valueB = b.toLowerCase();
  
// Compare based on sort order
  if (order === SortOrder.ASCENDING) {
    return valueA.localeCompare(valueB);
  } else {
    return valueB.localeCompare(valueA);
  }
}





// Quick Sort implementation for music tracks
// tracks - Array of tracks to sort
// field - Field to sort by (title, artist, or album)
// order - Sort order (ascending or descending)

export function quickSort<T extends Record<string, any>>(
  tracks: T[], 
  field: SortField, 
  order: SortOrder
): T[] {

// Create a copy to avoid mutating the original array
  const tracksCopy = [...tracks];
  
// Base case: arrays with 0 or 1 element are already sorted
  if (tracksCopy.length <= 1) {
    return tracksCopy;
  }
  
// Choose a pivot (middle element)
  const pivotIndex = Math.floor(tracksCopy.length / 2);
  const pivot = tracksCopy[pivotIndex];
  const pivotValue = getFieldValue(pivot, field);
  
// Partition the array into elements less than, equal to, and greater than the pivot
  const less: T[] = [];
  const equal: T[] = [];
  const greater: T[] = [];
  
// Partition the array
  for (const track of tracksCopy) {
    const trackValue = getFieldValue(track, field);
    const comparison = compareValues(trackValue, pivotValue, SortOrder.ASCENDING);
    
    if (comparison < 0) {
      less.push(track);
    } else if (comparison > 0) {
      greater.push(track);
    } else {
      equal.push(track);
    }
  }
  
// Recursively sort the partitions and combine them
  if (order === SortOrder.ASCENDING) {
    return [...quickSort(less, field, order), ...equal, ...quickSort(greater, field, order)];
  } else {
    return [...quickSort(greater, field, order), ...equal, ...quickSort(less, field, order)];
  }
}
