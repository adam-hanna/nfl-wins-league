# NFL Wins League 2025

A static web page to track the progress of an NFL wins league where each player chose three teams. The player with the most cumulative wins at the end of the season wins.

## Features

- **Real-time NFL Data**: Fetches current team records from ESPN's free API
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Auto-refresh**: Updates data every 30 minutes
- **Visual Rankings**: Top 3 players are highlighted with different colors
- **Team Logos**: Displays official NFL team logos when available

## Players and Teams

| Player | Teams |
|--------|-------|
| Beau Chadwick | Buffalo Bills, Las Vegas Raiders, Tennessee Titans |
| Alex Lanser | Philadelphia Eagles, Miami Dolphins, New York Jets |
| Daniel Maloney | Baltimore Ravens, Atlanta Falcons, New York Giants |
| Adam Hanna | Kansas City Chiefs, Pittsburgh Steelers, Arizona Cardinals |
| Kevin Strahley | San Francisco 49ers, Los Angeles Chargers, New England Patriots |
| David Ribbens | Detroit Lions, Houston Texans, Chicago Bears |
| Kyle Remley | Washington Commanders, Los Angeles Rams, Carolina Panthers |
| Dustin Delpizzo | Denver Broncos, Dallas Cowboys, Seattle Seahawks |
| Ramsey Davis | Tampa Bay Buccaneers, Green Bay Packers, Indianapolis Colts |
| Kirk | Cincinnati Bengals, Minnesota Vikings, Jacksonville Jaguars |

## GitHub Pages Deployment

This site is designed to work perfectly with GitHub Pages:

1. **Push to Repository**: Upload all files to your GitHub repository
2. **Enable GitHub Pages**: Go to Settings → Pages → Source: Deploy from a branch → Select `main` branch
3. **Access Your Site**: Your site will be available at `https://yourusername.github.io/repository-name`

## Files

- `src/index.html` - Main HTML structure
- `src/styles.css` - CSS styling and responsive design
- `src/script.js` - JavaScript for fetching NFL data and table functionality
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
# Start a local server from src directory
python3 -m http.server 8000 --directory src
```

## Updates

The page automatically refreshes NFL data every 30 minutes. Manual refresh is also supported by reloading the page.
