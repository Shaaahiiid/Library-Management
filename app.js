// Library Management System - JavaScript
class LibrarySystem {
    constructor() {
        // Initialize data structures with provided data
        this.books = [
            {
                id: "book_001",
                isbn: "978-0-547-92822-7",
                title: "The Hobbit",
                author: "J.R.R. Tolkien",
                genre: "Fantasy",
                publicationYear: 1937,
                totalCopies: 3,
                availableCopies: 2,
                dateAdded: "2025-01-15"
            },
            {
                id: "book_002", 
                isbn: "978-0-7432-7356-5",
                title: "To Kill a Mockingbird",
                author: "Harper Lee",
                genre: "Fiction",
                publicationYear: 1960,
                totalCopies: 2,
                availableCopies: 1,
                dateAdded: "2025-01-20"
            },
            {
                id: "book_003",
                isbn: "978-0-452-28423-4", 
                title: "1984",
                author: "George Orwell",
                genre: "Dystopian Fiction",
                publicationYear: 1949,
                totalCopies: 4,
                availableCopies: 3,
                dateAdded: "2025-02-01"
            },
            {
                id: "book_004",
                isbn: "978-0-06-112008-4",
                title: "The Alchemist",
                author: "Paulo Coelho", 
                genre: "Philosophy",
                publicationYear: 1988,
                totalCopies: 2,
                availableCopies: 0,
                dateAdded: "2025-02-10"
            },
            {
                id: "book_005",
                isbn: "978-0-7434-7679-3",
                title: "The Da Vinci Code",
                author: "Dan Brown",
                genre: "Thriller",
                publicationYear: 2003,
                totalCopies: 3,
                availableCopies: 2,
                dateAdded: "2025-02-15"
            }
        ];

        this.users = [
            {
                id: "user_001",
                name: "Alice Johnson",
                email: "alice.johnson@email.com",
                phone: "+1-555-0101",
                membershipDate: "2025-01-01",
                isActive: true
            },
            {
                id: "user_002", 
                name: "Bob Smith",
                email: "bob.smith@email.com",
                phone: "+1-555-0102",
                membershipDate: "2025-01-15",
                isActive: true
            },
            {
                id: "user_003",
                name: "Carol Davis",
                email: "carol.davis@email.com", 
                phone: "+1-555-0103",
                membershipDate: "2025-02-01",
                isActive: true
            },
            {
                id: "user_004",
                name: "David Wilson",
                email: "david.wilson@email.com",
                phone: "+1-555-0104", 
                membershipDate: "2025-02-10",
                isActive: false
            }
        ];

        this.transactions = [
            {
                id: "trans_001",
                userId: "user_001",
                bookId: "book_001",
                borrowDate: "2025-08-20",
                dueDate: "2025-09-03",
                returnDate: null,
                status: "overdue",
                fineAmount: 5.0
            },
            {
                id: "trans_002",
                userId: "user_002", 
                bookId: "book_002",
                borrowDate: "2025-09-01",
                dueDate: "2025-09-15",
                returnDate: null,
                status: "borrowed",
                fineAmount: 0
            },
            {
                id: "trans_003",
                userId: "user_003",
                bookId: "book_004",
                borrowDate: "2025-08-15",
                dueDate: "2025-08-29", 
                returnDate: null,
                status: "overdue",
                fineAmount: 10.0
            },
            {
                id: "trans_004",
                userId: "user_001",
                bookId: "book_004",
                borrowDate: "2025-08-25",
                dueDate: "2025-09-08",
                returnDate: null,
                status: "overdue", 
                fineAmount: 3.0
            },
            {
                id: "trans_005",
                userId: "user_002",
                bookId: "book_003",
                borrowDate: "2025-07-10",
                dueDate: "2025-07-24",
                returnDate: "2025-07-20",
                status: "returned",
                fineAmount: 0
            }
        ];

        this.currentView = 'dashboard';
        this.editingItem = null;
        this.currentBookSearch = '';
        this.currentUserSearch = '';
    }

    init() {
        this.bindEvents();
        this.updateTransactionStatuses();
        this.showView('dashboard');
    }

    // Event Binding
    bindEvents() {
        // Navigation - Fix navigation event binding
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                if (view) {
                    this.showView(view);
                }
            });
        });

        // Book management
        const addBookBtn = document.getElementById('add-book-btn');
        if (addBookBtn) {
            addBookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openBookModal();
            });
        }

        const bookForm = document.getElementById('book-form');
        if (bookForm) {
            bookForm.addEventListener('submit', (e) => this.handleBookSubmit(e));
        }

        const bookModalClose = document.getElementById('book-modal-close');
        if (bookModalClose) {
            bookModalClose.addEventListener('click', () => this.closeModal('book-modal'));
        }

        const bookCancel = document.getElementById('book-cancel');
        if (bookCancel) {
            bookCancel.addEventListener('click', () => this.closeModal('book-modal'));
        }

        const booksSearch = document.getElementById('books-search');
        if (booksSearch) {
            booksSearch.addEventListener('input', (e) => {
                this.currentBookSearch = e.target.value;
                this.searchBooks(e.target.value);
            });
        }

        // User management
        const addUserBtn = document.getElementById('add-user-btn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openUserModal();
            });
        }

        const userForm = document.getElementById('user-form');
        if (userForm) {
            userForm.addEventListener('submit', (e) => this.handleUserSubmit(e));
        }

        const userModalClose = document.getElementById('user-modal-close');
        if (userModalClose) {
            userModalClose.addEventListener('click', () => this.closeModal('user-modal'));
        }

        const userCancel = document.getElementById('user-cancel');
        if (userCancel) {
            userCancel.addEventListener('click', () => this.closeModal('user-modal'));
        }

        const usersSearch = document.getElementById('users-search');
        if (usersSearch) {
            usersSearch.addEventListener('input', (e) => {
                this.currentUserSearch = e.target.value;
                this.searchUsers(e.target.value);
            });
        }

        // Borrowing management
        const borrowBookBtn = document.getElementById('borrow-book-btn');
        if (borrowBookBtn) {
            borrowBookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openBorrowModal();
            });
        }

        const returnBookBtn = document.getElementById('return-book-btn');
        if (returnBookBtn) {
            returnBookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openReturnModal();
            });
        }

        const borrowForm = document.getElementById('borrow-form');
        if (borrowForm) {
            borrowForm.addEventListener('submit', (e) => this.handleBorrowSubmit(e));
        }

        const returnForm = document.getElementById('return-form');
        if (returnForm) {
            returnForm.addEventListener('submit', (e) => this.handleReturnSubmit(e));
        }

        // Modal close events
        const borrowModalClose = document.getElementById('borrow-modal-close');
        if (borrowModalClose) {
            borrowModalClose.addEventListener('click', () => this.closeModal('borrow-modal'));
        }

        const borrowCancel = document.getElementById('borrow-cancel');
        if (borrowCancel) {
            borrowCancel.addEventListener('click', () => this.closeModal('borrow-modal'));
        }

        const returnModalClose = document.getElementById('return-modal-close');
        if (returnModalClose) {
            returnModalClose.addEventListener('click', () => this.closeModal('return-modal'));
        }

        const returnCancel = document.getElementById('return-cancel');
        if (returnCancel) {
            returnCancel.addEventListener('click', () => this.closeModal('return-modal'));
        }

        // Search and reports
        const advancedSearch = document.getElementById('advanced-search');
        if (advancedSearch) {
            advancedSearch.addEventListener('input', (e) => this.performAdvancedSearch(e.target.value));
        }

        const searchFilter = document.getElementById('search-filter');
        if (searchFilter) {
            searchFilter.addEventListener('change', (e) => {
                const searchTerm = document.getElementById('advanced-search').value;
                this.performAdvancedSearch(searchTerm);
            });
        }

        // Confirmation modal
        const confirmModalClose = document.getElementById('confirm-modal-close');
        if (confirmModalClose) {
            confirmModalClose.addEventListener('click', () => this.closeModal('confirm-modal'));
        }

        const confirmCancel = document.getElementById('confirm-cancel');
        if (confirmCancel) {
            confirmCancel.addEventListener('click', () => this.closeModal('confirm-modal'));
        }

        // Modal background click to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal.id);
                }
            });
        });
    }

    // Navigation - Fixed view switching
    showView(viewName) {
        console.log('Switching to view:', viewName);
        
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-view="${viewName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
        }

        this.currentView = viewName;

        // Load view-specific data
        switch(viewName) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'books':
                this.displayBooks(this.currentBookSearch);
                break;
            case 'users':
                this.displayUsers(this.currentUserSearch);
                break;
            case 'borrowing':
                this.displayBorrowings();
                break;
            case 'reports':
                this.updateReports();
                break;
        }
    }

    // Dashboard
    updateDashboard() {
        const totalBooks = this.books.reduce((sum, book) => sum + book.totalCopies, 0);
        const availableBooks = this.books.reduce((sum, book) => sum + book.availableCopies, 0);
        const borrowedBooks = totalBooks - availableBooks;
        const totalUsers = this.users.filter(user => user.isActive).length;

        document.getElementById('total-books').textContent = totalBooks;
        document.getElementById('available-books').textContent = availableBooks;
        document.getElementById('borrowed-books').textContent = borrowedBooks;
        document.getElementById('total-users').textContent = totalUsers;

        this.displayRecentTransactions();
    }

    displayRecentTransactions() {
        const container = document.getElementById('recent-transactions');
        const recentTransactions = this.transactions
            .filter(t => t.status !== 'returned')
            .slice(0, 5);

        if (recentTransactions.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No recent transactions</p></div>';
            return;
        }

        container.innerHTML = recentTransactions.map(transaction => {
            const user = this.users.find(u => u.id === transaction.userId);
            const book = this.books.find(b => b.id === transaction.bookId);
            return `
                <div class="transaction-item">
                    <div class="transaction-info">
                        <h4>${user?.name || 'Unknown User'} - ${book?.title || 'Unknown Book'}</h4>
                        <p>Due: ${this.formatDate(transaction.dueDate)} | Status: ${transaction.status}</p>
                    </div>
                    <span class="status-${transaction.status}">${transaction.status}</span>
                </div>
            `;
        }).join('');
    }

    // Books Management - Fixed search functionality
    displayBooks(searchTerm = '') {
        const tbody = document.getElementById('books-table-body');
        if (!tbody) return;
        
        let filteredBooks = this.books;

        if (searchTerm && searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filteredBooks = this.books.filter(book => 
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term) ||
                book.isbn.toLowerCase().includes(term)
            );
        }

        tbody.innerHTML = filteredBooks.map(book => {
            const status = book.availableCopies > 0 ? 'Available' : 'Unavailable';
            const statusClass = book.availableCopies > 0 ? 'status-available' : 'status-unavailable';
            
            return `
                <tr>
                    <td>${book.isbn}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.genre}</td>
                    <td>${book.publicationYear}</td>
                    <td>${book.totalCopies}</td>
                    <td>${book.availableCopies}</td>
                    <td><span class="${statusClass}">${status}</span></td>
                    <td>
                        <button class="action-btn action-btn--edit" onclick="library.editBook('${book.id}')">Edit</button>
                        <button class="action-btn action-btn--delete" onclick="library.deleteBook('${book.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');

        if (filteredBooks.length === 0) {
            tbody.innerHTML = '<tr><td colspan="9" class="empty-state">No books found</td></tr>';
        }
    }

    openBookModal(book = null) {
        const modal = document.getElementById('book-modal');
        const title = document.getElementById('book-modal-title');
        
        if (book) {
            title.textContent = 'Edit Book';
            this.populateBookForm(book);
            this.editingItem = book.id;
        } else {
            title.textContent = 'Add Book';
            this.resetBookForm();
            this.editingItem = null;
        }
        
        modal.classList.remove('hidden');
    }

    populateBookForm(book) {
        document.getElementById('book-isbn').value = book.isbn;
        document.getElementById('book-title').value = book.title;
        document.getElementById('book-author').value = book.author;
        document.getElementById('book-genre').value = book.genre;
        document.getElementById('book-year').value = book.publicationYear;
        document.getElementById('book-copies').value = book.totalCopies;
    }

    resetBookForm() {
        const form = document.getElementById('book-form');
        if (form) {
            form.reset();
        }
    }

    handleBookSubmit(e) {
        e.preventDefault();
        
        const bookData = {
            isbn: document.getElementById('book-isbn').value.trim(),
            title: document.getElementById('book-title').value.trim(),
            author: document.getElementById('book-author').value.trim(),
            genre: document.getElementById('book-genre').value.trim(),
            publicationYear: parseInt(document.getElementById('book-year').value),
            totalCopies: parseInt(document.getElementById('book-copies').value)
        };

        // Validation
        if (!this.validateBookData(bookData)) {
            return;
        }

        if (this.editingItem) {
            this.updateBook(this.editingItem, bookData);
        } else {
            this.addBook(bookData);
        }

        this.closeModal('book-modal');
        this.displayBooks(this.currentBookSearch);
        this.updateDashboard();
    }

    validateBookData(bookData) {
        if (!bookData.isbn || !bookData.title || !bookData.author || !bookData.genre) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }

        if (isNaN(bookData.publicationYear) || bookData.publicationYear < 1000 || bookData.publicationYear > new Date().getFullYear()) {
            this.showNotification('Please enter a valid publication year', 'error');
            return false;
        }

        if (isNaN(bookData.totalCopies) || bookData.totalCopies < 1) {
            this.showNotification('Total copies must be at least 1', 'error');
            return false;
        }

        // Check for duplicate ISBN (only for new books or when ISBN is changed)
        const existingBook = this.books.find(b => b.isbn === bookData.isbn && b.id !== this.editingItem);
        if (existingBook) {
            this.showNotification('A book with this ISBN already exists', 'error');
            return false;
        }

        return true;
    }

    addBook(bookData) {
        const newBook = {
            id: `book_${Date.now()}`,
            ...bookData,
            availableCopies: bookData.totalCopies,
            dateAdded: new Date().toISOString().split('T')[0]
        };

        this.books.push(newBook);
        this.showNotification('Book added successfully', 'success');
    }

    updateBook(bookId, bookData) {
        const bookIndex = this.books.findIndex(b => b.id === bookId);
        if (bookIndex !== -1) {
            const currentBook = this.books[bookIndex];
            const borrowedCopies = currentBook.totalCopies - currentBook.availableCopies;
            
            this.books[bookIndex] = {
                ...currentBook,
                ...bookData,
                availableCopies: Math.max(0, bookData.totalCopies - borrowedCopies)
            };
            
            this.showNotification('Book updated successfully', 'success');
        }
    }

    editBook(bookId) {
        const book = this.books.find(b => b.id === bookId);
        if (book) {
            this.openBookModal(book);
        }
    }

    deleteBook(bookId) {
        // Check if book has active borrowings
        const activeBorrowings = this.transactions.filter(t => 
            t.bookId === bookId && t.status !== 'returned'
        );
        
        if (activeBorrowings.length > 0) {
            this.showNotification('Cannot delete book with active borrowings', 'error');
            return;
        }

        this.showConfirmDialog(
            'Are you sure you want to delete this book?',
            () => {
                this.books = this.books.filter(b => b.id !== bookId);
                this.displayBooks(this.currentBookSearch);
                this.updateDashboard();
                this.showNotification('Book deleted successfully', 'success');
            }
        );
    }

    searchBooks(searchTerm) {
        this.displayBooks(searchTerm);
    }

    // Users Management
    displayUsers(searchTerm = '') {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;
        
        let filteredUsers = this.users;

        if (searchTerm && searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filteredUsers = this.users.filter(user => 
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.id.toLowerCase().includes(term)
            );
        }

        tbody.innerHTML = filteredUsers.map(user => {
            const statusClass = user.isActive ? 'status-active' : 'status-inactive';
            const statusText = user.isActive ? 'Active' : 'Inactive';
            
            return `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${this.formatDate(user.membershipDate)}</td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="action-btn action-btn--edit" onclick="library.editUser('${user.id}')">Edit</button>
                        <button class="action-btn action-btn--delete" onclick="library.deleteUser('${user.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('');

        if (filteredUsers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No users found</td></tr>';
        }
    }

    openUserModal(user = null) {
        const modal = document.getElementById('user-modal');
        const title = document.getElementById('user-modal-title');
        
        if (user) {
            title.textContent = 'Edit User';
            this.populateUserForm(user);
            this.editingItem = user.id;
        } else {
            title.textContent = 'Add User';
            this.resetUserForm();
            this.editingItem = null;
        }
        
        modal.classList.remove('hidden');
    }

    populateUserForm(user) {
        document.getElementById('user-name').value = user.name;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-phone').value = user.phone;
    }

    resetUserForm() {
        const form = document.getElementById('user-form');
        if (form) {
            form.reset();
        }
    }

    handleUserSubmit(e) {
        e.preventDefault();
        
        const userData = {
            name: document.getElementById('user-name').value.trim(),
            email: document.getElementById('user-email').value.trim(),
            phone: document.getElementById('user-phone').value.trim()
        };

        // Validation
        if (!this.validateUserData(userData)) {
            return;
        }

        if (this.editingItem) {
            this.updateUser(this.editingItem, userData);
        } else {
            this.addUser(userData);
        }

        this.closeModal('user-modal');
        this.displayUsers(this.currentUserSearch);
        this.updateDashboard();
    }

    validateUserData(userData) {
        if (!userData.name || !userData.email || !userData.phone) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }

        // Check for duplicate email
        const existingUser = this.users.find(u => u.email === userData.email && u.id !== this.editingItem);
        if (existingUser) {
            this.showNotification('A user with this email already exists', 'error');
            return false;
        }

        return true;
    }

    addUser(userData) {
        const newUser = {
            id: `user_${Date.now()}`,
            ...userData,
            membershipDate: new Date().toISOString().split('T')[0],
            isActive: true
        };

        this.users.push(newUser);
        this.showNotification('User added successfully', 'success');
    }

    updateUser(userId, userData) {
        const userIndex = this.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            this.users[userIndex] = {
                ...this.users[userIndex],
                ...userData
            };
            this.showNotification('User updated successfully', 'success');
        }
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (user) {
            this.openUserModal(user);
        }
    }

    deleteUser(userId) {
        // Check if user has active borrowings
        const activeBorrowings = this.transactions.filter(t => 
            t.userId === userId && t.status !== 'returned'
        );
        
        if (activeBorrowings.length > 0) {
            this.showNotification('Cannot delete user with active borrowings', 'error');
            return;
        }

        this.showConfirmDialog(
            'Are you sure you want to delete this user?',
            () => {
                this.users = this.users.filter(u => u.id !== userId);
                this.displayUsers(this.currentUserSearch);
                this.updateDashboard();
                this.showNotification('User deleted successfully', 'success');
            }
        );
    }

    searchUsers(searchTerm) {
        this.displayUsers(searchTerm);
    }

    // Borrowing Management
    displayBorrowings() {
        const tbody = document.getElementById('borrowings-table-body');
        if (!tbody) return;
        
        const activeBorrowings = this.transactions.filter(t => t.status !== 'returned');

        tbody.innerHTML = activeBorrowings.map(transaction => {
            const user = this.users.find(u => u.id === transaction.userId);
            const book = this.books.find(b => b.id === transaction.bookId);
            const isOverdue = transaction.status === 'overdue';
            
            return `
                <tr class="${isOverdue ? 'overdue-row' : ''}">
                    <td>${user?.name || 'Unknown User'}</td>
                    <td>${book?.title || 'Unknown Book'}</td>
                    <td>${this.formatDate(transaction.borrowDate)}</td>
                    <td>${this.formatDate(transaction.dueDate)}</td>
                    <td><span class="status-${transaction.status}">${transaction.status}</span></td>
                    <td>$${transaction.fineAmount.toFixed(2)}</td>
                    <td>
                        <button class="action-btn action-btn--return" onclick="library.returnBook('${transaction.id}')">Return</button>
                    </td>
                </tr>
            `;
        }).join('');

        if (activeBorrowings.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No active borrowings</td></tr>';
        }
    }

    openBorrowModal() {
        this.populateBorrowSelects();
        document.getElementById('borrow-modal').classList.remove('hidden');
    }

    openReturnModal() {
        this.populateReturnSelect();
        document.getElementById('return-modal').classList.remove('hidden');
    }

    populateBorrowSelects() {
        const userSelect = document.getElementById('borrow-user');
        const bookSelect = document.getElementById('borrow-book');

        if (!userSelect || !bookSelect) return;

        // Populate users (only active users)
        const activeUsers = this.users.filter(u => u.isActive);
        userSelect.innerHTML = '<option value="">Choose user...</option>' + 
            activeUsers.map(user => `<option value="${user.id}">${user.name}</option>`).join('');

        // Populate available books
        const availableBooks = this.books.filter(b => b.availableCopies > 0);
        bookSelect.innerHTML = '<option value="">Choose book...</option>' + 
            availableBooks.map(book => `<option value="${book.id}">${book.title} (${book.availableCopies} available)</option>`).join('');
    }

    populateReturnSelect() {
        const transactionSelect = document.getElementById('return-transaction');
        if (!transactionSelect) return;
        
        const activeBorrowings = this.transactions.filter(t => t.status !== 'returned');

        transactionSelect.innerHTML = '<option value="">Choose transaction...</option>' + 
            activeBorrowings.map(transaction => {
                const user = this.users.find(u => u.id === transaction.userId);
                const book = this.books.find(b => b.id === transaction.bookId);
                return `<option value="${transaction.id}">${user?.name} - ${book?.title} (Due: ${this.formatDate(transaction.dueDate)})</option>`;
            }).join('');
    }

    handleBorrowSubmit(e) {
        e.preventDefault();
        
        const userId = document.getElementById('borrow-user').value;
        const bookId = document.getElementById('borrow-book').value;

        if (!userId || !bookId) {
            this.showNotification('Please select both user and book', 'error');
            return;
        }

        this.borrowBook(userId, bookId);
        this.closeModal('borrow-modal');
    }

    handleReturnSubmit(e) {
        e.preventDefault();
        
        const transactionId = document.getElementById('return-transaction').value;

        if (!transactionId) {
            this.showNotification('Please select a transaction', 'error');
            return;
        }

        this.returnBookByTransaction(transactionId);
        this.closeModal('return-modal');
    }

    borrowBook(userId, bookId) {
        const user = this.users.find(u => u.id === userId);
        const book = this.books.find(b => b.id === bookId);

        if (!user || !book || book.availableCopies === 0) {
            this.showNotification('Invalid selection or book not available', 'error');
            return;
        }

        // Create transaction
        const borrowDate = new Date();
        const dueDate = new Date(borrowDate);
        dueDate.setDate(dueDate.getDate() + 14); // 14 days loan period

        const transaction = {
            id: `trans_${Date.now()}`,
            userId,
            bookId,
            borrowDate: borrowDate.toISOString().split('T')[0],
            dueDate: dueDate.toISOString().split('T')[0],
            returnDate: null,
            status: 'borrowed',
            fineAmount: 0
        };

        this.transactions.push(transaction);

        // Update book availability
        const bookIndex = this.books.findIndex(b => b.id === bookId);
        this.books[bookIndex].availableCopies--;

        this.displayBorrowings();
        this.updateDashboard();
        this.showNotification(`Book borrowed successfully to ${user.name}`, 'success');
    }

    returnBook(transactionId) {
        this.returnBookByTransaction(transactionId);
    }

    returnBookByTransaction(transactionId) {
        const transactionIndex = this.transactions.findIndex(t => t.id === transactionId);
        if (transactionIndex === -1) {
            this.showNotification('Transaction not found', 'error');
            return;
        }

        const transaction = this.transactions[transactionIndex];
        const book = this.books.find(b => b.id === transaction.bookId);
        const user = this.users.find(u => u.id === transaction.userId);

        if (!book || !user) {
            this.showNotification('Invalid transaction data', 'error');
            return;
        }

        // Update transaction
        this.transactions[transactionIndex].returnDate = new Date().toISOString().split('T')[0];
        this.transactions[transactionIndex].status = 'returned';

        // Update book availability
        const bookIndex = this.books.findIndex(b => b.id === transaction.bookId);
        this.books[bookIndex].availableCopies++;

        this.displayBorrowings();
        this.updateDashboard();
        this.showNotification(`Book returned successfully from ${user.name}`, 'success');
    }

    // Transaction status updates
    updateTransactionStatuses() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        this.transactions.forEach(transaction => {
            if (transaction.status === 'borrowed') {
                const dueDate = new Date(transaction.dueDate);
                if (today > dueDate) {
                    transaction.status = 'overdue';
                    const overdueDays = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
                    transaction.fineAmount = overdueDays * 0.50; // $0.50 per day fine
                }
            }
        });
    }

    // Reports and Search
    updateReports() {
        const overdueCount = this.transactions.filter(t => t.status === 'overdue').length;
        const activeUsers = this.users.filter(u => u.isActive).length;
        
        document.getElementById('overdue-count').textContent = overdueCount;
        document.getElementById('active-users').textContent = activeUsers;

        // Most borrowed book
        const bookBorrowCounts = {};
        this.transactions.forEach(transaction => {
            bookBorrowCounts[transaction.bookId] = (bookBorrowCounts[transaction.bookId] || 0) + 1;
        });

        let mostBorrowedBook = '-';
        if (Object.keys(bookBorrowCounts).length > 0) {
            const mostBorrowedId = Object.keys(bookBorrowCounts).reduce((a, b) => 
                bookBorrowCounts[a] > bookBorrowCounts[b] ? a : b
            );
            const book = this.books.find(b => b.id === mostBorrowedId);
            mostBorrowedBook = book ? book.title : '-';
        }

        document.getElementById('most-borrowed').textContent = mostBorrowedBook;
    }

    performAdvancedSearch(searchTerm) {
        const filter = document.getElementById('search-filter').value;
        const resultsContainer = document.getElementById('search-results');

        if (!searchTerm || !searchTerm.trim()) {
            resultsContainer.innerHTML = '';
            return;
        }

        let results = [];
        const term = searchTerm.toLowerCase().trim();

        if (filter === 'all' || filter === 'books') {
            const bookResults = this.books.filter(book => 
                book.title.toLowerCase().includes(term) ||
                book.author.toLowerCase().includes(term) ||
                book.genre.toLowerCase().includes(term) ||
                book.isbn.includes(term)
            ).map(book => ({
                type: 'Book',
                title: book.title,
                details: `${book.author} - ${book.genre}`,
                id: book.id
            }));
            results = results.concat(bookResults);
        }

        if (filter === 'all' || filter === 'users') {
            const userResults = this.users.filter(user => 
                user.name.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.id.toLowerCase().includes(term)
            ).map(user => ({
                type: 'User',
                title: user.name,
                details: user.email,
                id: user.id
            }));
            results = results.concat(userResults);
        }

        if (filter === 'all' || filter === 'transactions') {
            const transactionResults = this.transactions.filter(transaction => {
                const user = this.users.find(u => u.id === transaction.userId);
                const book = this.books.find(b => b.id === transaction.bookId);
                return user && book && (
                    user.name.toLowerCase().includes(term) ||
                    book.title.toLowerCase().includes(term) ||
                    transaction.status.toLowerCase().includes(term)
                );
            }).map(transaction => {
                const user = this.users.find(u => u.id === transaction.userId);
                const book = this.books.find(b => b.id === transaction.bookId);
                return {
                    type: 'Transaction',
                    title: `${user?.name} - ${book?.title}`,
                    details: `Status: ${transaction.status}, Due: ${this.formatDate(transaction.dueDate)}`,
                    id: transaction.id
                };
            });
            results = results.concat(transactionResults);
        }

        this.displaySearchResults(results);
    }

    displaySearchResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;
        
        if (results.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No results found</p></div>';
            return;
        }

        container.innerHTML = `
            <h3>Search Results (${results.length})</h3>
            <div class="search-results-list">
                ${results.map(result => `
                    <div class="card">
                        <div class="card__body">
                            <div class="flex justify-between items-center">
                                <div>
                                    <h4>${result.title}</h4>
                                    <p style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${result.type} - ${result.details}</p>
                                </div>
                                <span class="status">${result.type}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Modal Management
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
        this.editingItem = null;
    }

    // Confirmation Dialog
    showConfirmDialog(message, onConfirm) {
        document.getElementById('confirm-message').textContent = message;
        document.getElementById('confirm-modal').classList.remove('hidden');
        
        // Remove any existing event listeners
        const confirmBtn = document.getElementById('confirm-ok');
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        newConfirmBtn.addEventListener('click', () => {
            onConfirm();
            this.closeModal('confirm-modal');
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        const messageEl = document.getElementById('notification-message');
        
        if (notification && messageEl) {
            messageEl.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.remove('hidden');
            
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        }
    }

    // Utility Methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    generateId(prefix) {
        return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Initialize the library system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.library = new LibrarySystem();
    window.library.init();
});