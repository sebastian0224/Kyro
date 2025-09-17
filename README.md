# 🚀 Kyro - Multi-Chain Portfolio Tracker

A modern, full-stack web application for tracking cryptocurrency portfolios across multiple blockchain networks. Built with Next.js 14, Kyro provides real-time portfolio analytics, transaction history, and comprehensive asset management.

![Kyro Dashboard](https://res.cloudinary.com/dijijlcze/image/upload/v1758123013/screencapture-kyro-alpha-vercel-app-portfolios-cmf7ap1bi0001v67ogsofs53w-2025-09-17-10_03_38_-_Editado_-_Editado_xmtcum.png)

## ✨ Features

### 📊 **Portfolio Management**

- Create and manage multiple crypto portfolios
- Add multiple wallet addresses per portfolio
- Real-time portfolio valuation and performance tracking
- Historical performance analytics (3-month charts)

### 🔗 **Multi-Chain Support**

- **Ethereum Mainnet** - Native ETH and ERC-20 tokens
- **Polygon** - MATIC and Polygon-based assets
- **Arbitrum** - Layer 2 scaling solution
- **Optimism** - Optimistic rollup network
- **Base** - Coinbase's L2 network
- **Binance Smart Chain** - BNB and BEP-20 tokens

### 💰 **Asset Analytics**

- Comprehensive token distribution analysis
- Network-based portfolio allocation
- Top 20 assets by value with percentage breakdown
- Real-time price tracking and portfolio percentages

### 📋 **Transaction History**

- Complete transaction history across all networks
- Support for external, internal, and token transfers (ERC-20, ERC-721, ERC-1155)
- Advanced filtering by wallet, network, and transaction type
- Direct links to blockchain explorers

### 🎨 **Modern UI/UX**

- Clean, professional interface with dark theme
- Responsive design for desktop and mobile
- Interactive charts and data visualizations
- Intuitive navigation and user experience

## 🛠️ Tech Stack

### **Frontend**

- **Next.js 14** - React framework with App Router
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Icon library

### **Backend**

- **Next.js API Routes** - Server-side functionality
- **Prisma ORM** - Database management and modeling
- **PostgreSQL** - Relational database
- **NextAuth.js** - Authentication system

### **External APIs**

- **Alchemy API** - Blockchain data and asset information
- **Real-time price feeds** and historical data
- **Multi-chain transaction data**

### **Development**

- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting and formatting
- **Git** - Version control

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Alchemy API key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/kyro-portfolio-tracker.git
   cd kyro-portfolio-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   ```bash
   cp .env.example .env.local
   ```

   Configure your environment variables:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/kyro"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ALCHEMY_API_KEY="your-alchemy-api-key"
   ```

4. **Database Setup**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run Development Server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Core Functionality

### Portfolio Dashboard

- Overview of all portfolios with net worth
- Quick portfolio switching and management
- Real-time performance metrics

### Asset Management

- Detailed breakdown of all holdings
- Token distribution charts
- Network allocation analysis
- Price tracking with percentage changes

### Transaction Monitoring

- Complete transaction history
- Filter by wallet, network, or transaction type
- Sent/received indicators with amounts
- Direct blockchain explorer integration

### Wallet Integration

- Add multiple wallet addresses
- Automatic validation and verification
- Support for all major wallet formats
- Real-time balance updates

## 🔒 Security & Privacy

- Wallet addresses are read-only (view-only access)
- No private key storage or handling
- Secure authentication with NextAuth.js
- Data encryption and secure API communication

## 🎯 Use Cases

- **Individual Investors** - Track personal crypto holdings
- **Portfolio Managers** - Manage multiple client portfolios
- **DeFi Users** - Monitor assets across multiple protocols
- **Traders** - Analyze performance and allocation

## 🔄 Future Enhancements

- [ ] DeFi protocol integration (staking, lending)
- [ ] Mobile app development
- [ ] Advanced analytics and insights
- [ ] Portfolio sharing and social features
- [ ] Automated reporting and alerts
- [ ] Additional blockchain networks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

Built by Sebastian Osorio as a showcase of modern full-stack development capabilities.

- **Portfolio**: [yourportfolio.com]
- **LinkedIn**: [linkedin.com/in/yourprofile]
- **GitHub**: [github.com/yourusername]

---

**Kyro** - _Professional crypto portfolio management, simplified._
