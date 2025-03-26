// Form Validation for CV Generator

// Function to show error message
function showError(inputId, message) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error');
    }
}

// Function to hide error message
function hideError(inputId) {
    const errorElement = document.getElementById(`${inputId}-error`);
    const inputElement = document.getElementById(inputId);
    
    if (errorElement && inputElement) {
        errorElement.style.display = 'none';
        inputElement.classList.remove('error');
    }
}

// Function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Format date to "Month DD, YYYY" with leading zeros for days
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    // Ensure day has leading zero if it's single digit
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month} ${day}, ${year}`;
}

// Setup field validations
function setupValidation() {
    // Full Name validation
    document.getElementById('fullName').addEventListener('input', function(e) {
        const fullName = e.target.value.trim();
        const nameArray = fullName.split(' ');
        
        hideError('fullName');
        
        if (fullName.length === 0) {
            showError('fullName', 'Full name is required');
            return;
        }
        
        if (nameArray.length < 2) {
            showError('fullName', 'Please enter both first and last name');
            return;
        }
        
        const formattedName = nameArray.map(name => 
            name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
        ).join(' ');
        
        e.target.value = formattedName;
    });

    // UG HYT validation
    document.getElementById('ugHty').addEventListener('input', function(e) {
        let value = e.target.value.trim();
        hideError('ugHty');
        
        const matches = value.match(/^(ug|pg|phd|mtech|btech)/i);
        
        if (!matches && value.length > 0) {
            showError('ugHty', 'Should start with UG, PG, BTECH, etc.');
        } else if (matches) {
            const prefix = matches[0].toUpperCase();
            value = prefix + value.substring(matches[0].length);
            e.target.value = value;
        }
    });

    // Institute validation
    document.getElementById('institute').addEventListener('input', function(e) {
        let value = e.target.value.trim();
        hideError('institute');
        
        if (value.length > 0) {
            const instituteMatches = value.match(/(sgsits|iit|nit|iiit|bits|vit|mit|rgpv)/i);
            
            if (instituteMatches) {
                const institute = instituteMatches[0].toUpperCase();
                value = value.replace(new RegExp(instituteMatches[0], 'i'), institute);
                e.target.value = value;
            } else {
                showError('institute', 'Use capital letters for institute abbreviations');
            }
        }
    });

    // Date of Birth validation
    document.getElementById('dob').addEventListener('change', function(e) {
        const value = e.target.value;
        hideError('dob');
        
        if (value) {
            const date = new Date(value);
            const now = new Date();
            
            if (date > now) {
                showError('dob', 'Date of birth cannot be in the future');
            } else if (now.getFullYear() - date.getFullYear() < 15) {
                showError('dob', 'Age should be at least 15 years');
            }
        }
    });

    // Email validation
    document.getElementById('email').addEventListener('input', function(e) {
        const value = e.target.value.trim();
        hideError('email');
        
        if (value.length > 0 && !isValidEmail(value)) {
            showError('email', 'Please enter a valid email address');
        }
    });

    // Enrollment No validation
    document.getElementById('enrollmentNo').addEventListener('input', function(e) {
        let value = e.target.value.trim();
        hideError('enrollmentNo');
        
        if (value.length > 0) {
            const originalValue = value;
            
            // Convert any letters to uppercase
            value = value.replace(/[a-z]/g, match => match.toUpperCase());
            
            // Ensure it starts with 0 if it's numeric and doesn't already start with 0
            if (/^\d+/.test(value) && !value.startsWith('0')) {
                value = '0' + value;
            }
            
            e.target.value = value;
            
            // Check if we made any changes
            if (originalValue !== value) {
                showError('enrollmentNo', 'Enrollment number formatted (capital letters, leading zero)');
            }
        }
    });

    // Branch validation
    document.getElementById('branch').addEventListener('input', function(e) {
        let value = e.target.value.trim();
        hideError('branch');
        
        if (value.length > 0) {
            const originalValue = value;
            
            // Capitalize first letter of each word
            value = value.replace(/\b\w/g, match => match.toUpperCase());
            
            // Replace abbreviated forms of "Engineering"
            value = value.replace(/\bEng\b/i, 'Engineering');
            value = value.replace(/\bEngg\b/i, 'Engineering');
            
            e.target.value = value;
            
            // Check if we made any changes
            if (originalValue !== value) {
                showError('branch', 'Branch name formatted (capitalized, "Engineering" in full)');
            }
            
            // Check if it contains "Engineering" for technical branches
            const technicalBranches = ['Computer', 'Information', 'Electronics', 'Electrical', 'Mechanical', 'Civil'];
            if (technicalBranches.some(branch => value.includes(branch)) && !value.includes('Engineering')) {
                showError('branch', 'Technical branches should include "Engineering"');
            }
        }
    });

    // Specialization validation
    document.getElementById('specialization').addEventListener('input', function(e) {
        let value = e.target.value.trim();
        hideError('specialization');
        
        if (value.length > 0) {
            const originalValue = value;
            
            // Capitalize first letter of each word
            value = value.replace(/\b\w/g, match => match.toUpperCase());
            
            e.target.value = value;
            
            // Check if we made any changes
            if (originalValue !== value) {
                showError('specialization', 'Specialization formatted (capitalized)');
            }
        }
    });

    // Mobile validation
    document.getElementById('mobile').addEventListener('input', function(e) {
        let value = e.target.value.trim();
        hideError('mobile');
        
        if (value.length > 0) {
            const originalValue = value;
            
            // Ensure it starts with +91
            if (!value.startsWith('+91')) {
                if (value.startsWith('+')) {
                    value = '+91' + value.substring(1);
                } else if (value.startsWith('91')) {
                    value = '+' + value;
                } else {
                    value = '+91 ' + value.replace(/^\+91\s*/, '');
                }
            }
            
            // Ensure space after +91
            if (value.startsWith('+91') && value.length > 3 && value.charAt(3) !== ' ') {
                value = '+91 ' + value.substring(3);
            }
            
            // Extract digits
            const digits = value.replace(/\D/g, '');
            
            // Check digit count
            if (digits.length !== 12) { // +91 (2 digits) + 10 digit number
                showError('mobile', 'Mobile number should be 10 digits after +91');
            }
            
            // Limit to 10 digits after +91
            if (digits.length > 12) {
                const formattedDigits = digits.substring(digits.length - 10);
                value = '+91 ' + formattedDigits;
            }
            
            e.target.value = value;
            
            // Check if we made any changes
            if (originalValue !== value) {
                showError('mobile', 'Mobile number formatted (+91 XXXXXXXXXX)');
            }
        }
    });
}

// Validate form before generation
function validateForm() {
    let hasErrors = false;
    
    // Personal Details validation
    const fullName = document.getElementById('fullName').value.trim();
    if (!fullName) {
        showError('fullName', 'Full name is required');
        hasErrors = true;
    } else if (fullName.split(' ').length < 2) {
        showError('fullName', 'Please enter both first and last name');
        hasErrors = true;
    }
    
    const email = document.getElementById('email').value.trim();
    if (!email) {
        showError('email', 'Email is required');
        hasErrors = true;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        hasErrors = true;
    }
    
    // If there are errors, scroll to the first error
    if (hasErrors) {
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    return !hasErrors;
}

export { showError, hideError, isValidEmail, formatDate, setupValidation, validateForm }; 