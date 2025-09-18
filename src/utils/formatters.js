// Format a date string to a localized date format
export const formatDate = (dateString, locale = 'en-US') => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Format a number as a percentage
export const formatPercentage = (value) => {
  return `${Math.round(value)}%`;
};

// Format a duration in minutes to a readable format
export const formatDuration = (minutes) => {
  if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
    }
  }
};

// Format a file size in bytes to a human-readable format
export const formatFileSize = (bytes) => {
  if (bytes < 1024) {
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  } else {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }
};

// Truncate a long string and add ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

// Capitalize the first letter of each word in a string
export const capitalizeWords = (string) => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};
