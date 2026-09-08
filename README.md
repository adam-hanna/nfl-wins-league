# NFL Wins League 2026

A static web page to track the progress of an NFL wins league where each player chose three teams. The player with the most cumulative wins at the end of the season wins.

## Features

- **Real-time NFL Data**: Fetches current team records from ESPN's free API
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Auto-refresh**: Updates data every 30 minutes
- **Visual Rankings**: Top 3 players are highlighted with different colors
- **Team Logos**: Displays official NFL team logos when available

## Players and Teams

Drafted 2026-09-02 to 09-07, in draft order. The Arizona Cardinals and Miami Dolphins went undrafted.

| Player | Teams |
|--------|-------|
| Dustin Delpizzo | Los Angeles Rams, Dallas Cowboys, Atlanta Falcons |
| Kevin Ribbens | Baltimore Ravens, Tampa Bay Buccaneers, New York Jets |
| Kevin Strahley | Buffalo Bills, Los Angeles Chargers, Las Vegas Raiders |
| Alex Lanser | Seattle Seahawks, Indianapolis Colts, Carolina Panthers |
| David Ribbens | Detroit Lions, Jacksonville Jaguars, Tennessee Titans |
| Ramsey Davis | New England Patriots, Minnesota Vikings, Pittsburgh Steelers |
| Kyle Remley | Denver Broncos, Cincinnati Bengals, Cleveland Browns |
| Kirk | Houston Texans, Chicago Bears, New Orleans Saints |
| Beau Chadwick | Philadelphia Eagles, Green Bay Packers, Washington Commanders |
| Adam Hanna | Kansas City Chiefs, San Francisco 49ers, New York Giants |

## GitHub Pages Deployment

This site is designed to work perfectly with GitHub Pages:

1. **Push to Repository**: Upload all files to your GitHub repository
2. **Enable GitHub Pages**: Go to Settings → Pages → Source: Deploy from a branch → Select `main` branch
3. **Access Your Site**: Your site will be available at `https://adam-hanna.github.io/nfl-wins-league/`

## Files

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and responsive design
- `script.js` - JavaScript for fetching NFL data and table functionality
- `package.json` - Node.js package configuration with run scripts
- `README.md` - This documentation

## API Usage

The site uses ESPN's free NFL API endpoints:
- Team data: `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams`
- No API key required
- CORS-enabled for browser requests

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Local Development

To run locally:

```bash
# Navigate to project directory
cd wins-league

# Install dependencies (optional - no dependencies required)
npm install

# Start the development server
npm start
# or
npm run dev

# Open browser to http://localhost:8000
```

Alternative manual method:
```bash
# Start a local server from root directory
python3 -m http.server 3000
```

## Updates

The page automatically refreshes NFL data every 30 minutes. Manual refresh is also supported by reloading the page.
