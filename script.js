// Player data with their teams
const playersData = [
    {
        name: "Beau Chadwick",
        teams: [
            { city: "Buffalo", name: "Bills" },
            { city: "Las Vegas", name: "Raiders" },
            { city: "Tennessee", name: "Titans" }
        ]
    },
    {
        name: "Alex Lanser",
        teams: [
            { city: "Philadelphia", name: "Eagles" },
            { city: "Miami", name: "Dolphins" },
            { city: "New York", name: "Jets" }
        ]
    },
    {
        name: "Daniel Maloney",
        teams: [
            { city: "Baltimore", name: "Ravens" },
            { city: "Atlanta", name: "Falcons" },
            { city: "New York", name: "Giants" }
        ]
    },
    {
        name: "Adam Hanna",
        teams: [
            { city: "Kansas City", name: "Chiefs" },
            { city: "Pittsburgh", name: "Steelers" },
            { city: "Arizona", name: "Cardinals" }
        ]
    },
    {
        name: "Kevin Strahley",
        teams: [
            { city: "San Francisco", name: "49ers" },
            { city: "Los Angeles", name: "Chargers" },
            { city: "New England", name: "Patriots" }
        ]
    },
    {
        name: "David Ribbens",
        teams: [
            { city: "Detroit", name: "Lions" },
            { city: "Houston", name: "Texans" },
            { city: "Chicago", name: "Bears" }
        ]
    },
    {
        name: "Kyle Remley",
        teams: [
            { city: "Washington", name: "Commanders" },
            { city: "Los Angeles", name: "Rams" },
            { city: "Carolina", name: "Panthers" }
        ]
    },
    {
        name: "Dustin Delpizzo",
        teams: [
            { city: "Denver", name: "Broncos" },
            { city: "Dallas", name: "Cowboys" },
            { city: "Seattle", name: "Seahawks" }
        ]
    },
    {
        name: "Ramsey Davis",
        teams: [
            { city: "Tampa Bay", name: "Buccaneers" },
            { city: "Green Bay", name: "Packers" },
            { city: "Indianapolis", name: "Colts" }
        ]
    },
    {
        name: "Kirk",
        teams: [
            { city: "Cincinnati", name: "Bengals" },
            { city: "Minnesota", name: "Vikings" },
            { city: "Jacksonville", name: "Jaguars" }
        ]
    }
];

// Team name mapping for ESPN API
const teamMapping = {
    "Buffalo Bills": { id: 2, abbreviation: "BUF" },
    "Las Vegas Raiders": { id: 13, abbreviation: "LV" },
    "Tennessee Titans": { id: 10, abbreviation: "TEN" },
    "Philadelphia Eagles": { id: 21, abbreviation: "PHI" },
    "Miami Dolphins": { id: 15, abbreviation: "MIA" },
    "New York Jets": { id: 20, abbreviation: "NYJ" },
    "Baltimore Ravens": { id: 33, abbreviation: "BAL" },
    "Atlanta Falcons": { id: 1, abbreviation: "ATL" },
    "New York Giants": { id: 19, abbreviation: "NYG" },
    "Kansas City Chiefs": { id: 12, abbreviation: "KC" },
    "Pittsburgh Steelers": { id: 23, abbreviation: "PIT" },
    "Arizona Cardinals": { id: 22, abbreviation: "ARI" },
    "San Francisco 49ers": { id: 25, abbreviation: "SF" },
    "Los Angeles Chargers": { id: 24, abbreviation: "LAC" },
    "New England Patriots": { id: 17, abbreviation: "NE" },
    "Detroit Lions": { id: 8, abbreviation: "DET" },
    "Houston Texans": { id: 34, abbreviation: "HOU" },
    "Chicago Bears": { id: 3, abbreviation: "CHI" },
    "Washington Commanders": { id: 28, abbreviation: "WSH" },
    "Los Angeles Rams": { id: 14, abbreviation: "LAR" },
    "Carolina Panthers": { id: 29, abbreviation: "CAR" },
    "Denver Broncos": { id: 7, abbreviation: "DEN" },
    "Dallas Cowboys": { id: 6, abbreviation: "DAL" },
    "Seattle Seahawks": { id: 26, abbreviation: "SEA" },
    "Tampa Bay Buccaneers": { id: 27, abbreviation: "TB" },
    "Green Bay Packers": { id: 9, abbreviation: "GB" },
    "Indianapolis Colts": { id: 11, abbreviation: "IND" },
    "Cincinnati Bengals": { id: 4, abbreviation: "CIN" },
    "Minnesota Vikings": { id: 16, abbreviation: "MIN" },
    "Jacksonville Jaguars": { id: 30, abbreviation: "JAX" }
};

let teamRecords = {};

// Fetch team records from ESPN API
async function fetchTeamRecords() {
    try {
        // Get all teams data first
        const teamsResponse = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams');
        const teamsData = await teamsResponse.json();
        
        // Extract team records from the teams data
        for (const team of teamsData.sports[0].leagues[0].teams) {
            const teamName = `${team.team.location} ${team.team.name}`;
            const record = team.team.record?.items?.find(item => item.type === 'total');
            
            if (record) {
                teamRecords[teamName] = {
                    wins: parseInt(record.stats?.find(stat => stat.name === 'wins')?.value || 0),
                    losses: parseInt(record.stats?.find(stat => stat.name === 'losses')?.value || 0),
                    logo: team.team.logos?.[0]?.href || ''
                };
            } else {
                // Fallback: assume 0 wins if no record found (early season)
                teamRecords[teamName] = {
                    wins: 0,
                    losses: 0,
                    logo: team.team.logos?.[0]?.href || ''
                };
            }
        }
        
        return teamRecords;
    } catch (error) {
        console.error('Error fetching team records:', error);
        // Fallback data for testing
        return createFallbackData();
    }
}

// Create fallback data for testing/development
function createFallbackData() {
    const fallbackRecords = {};
    
    Object.keys(teamMapping).forEach(teamName => {
        fallbackRecords[teamName] = {
            wins: Math.floor(Math.random() * 12), // Random wins for demo
            losses: Math.floor(Math.random() * 12),
            logo: ''
        };
    });
    
    return fallbackRecords;
}

// Calculate player totals and sort
function calculatePlayerTotals() {
    const playerTotals = playersData.map(player => {
        const playerTeams = player.teams.map(team => {
            const teamFullName = `${team.city} ${team.name}`;
            const record = teamRecords[teamFullName] || { wins: 0, losses: 0, logo: '' };
            
            return {
                ...team,
                wins: record.wins,
                losses: record.losses,
                logo: record.logo
            };
        });
        
        const totalWins = playerTeams.reduce((sum, team) => sum + team.wins, 0);
        
        return {
            name: player.name,
            teams: playerTeams,
            totalWins: totalWins
        };
    });
    
    // Sort by total wins (descending)
    return playerTotals.sort((a, b) => b.totalWins - a.totalWins);
}

// Render the table
function renderTable(playerData) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';
    
    playerData.forEach((player, playerIndex) => {
        player.teams.forEach((team, teamIndex) => {
            const row = document.createElement('tr');
            
            // Add rank class for styling
            if (playerIndex === 0) row.classList.add('rank-1');
            else if (playerIndex === 1) row.classList.add('rank-2');
            else if (playerIndex === 2) row.classList.add('rank-3');
            
            // Player name cell (only for first team row)
            if (teamIndex === 0) {
                const playerCell = document.createElement('td');
                playerCell.className = 'player-name';
                playerCell.textContent = player.name;
                playerCell.rowSpan = 3;
                row.appendChild(playerCell);
            }
            
            // Team cell
            const teamCell = document.createElement('td');
            teamCell.className = 'team-name';
            if (team.logo) {
                teamCell.innerHTML = `<img src="${team.logo}" alt="${team.city} ${team.name}" class="team-logo">${team.city} ${team.name}`;
            } else {
                teamCell.textContent = `${team.city} ${team.name}`;
            }
            row.appendChild(teamCell);
            
            // Wins cell
            const winsCell = document.createElement('td');
            winsCell.className = 'wins-count';
            winsCell.textContent = team.wins;
            row.appendChild(winsCell);
            
            // Total wins cell (only for first team row)
            if (teamIndex === 0) {
                const totalCell = document.createElement('td');
                totalCell.className = 'total-wins';
                totalCell.textContent = player.totalWins;
                totalCell.rowSpan = 3;
                row.appendChild(totalCell);
            }
            
            tableBody.appendChild(row);
        });
    });
}

// Update last updated timestamp
function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    const now = new Date();
    lastUpdatedElement.textContent = `Last updated: ${now.toLocaleString()}`;
}

// Show/hide loading state
function setLoading(isLoading) {
    const loading = document.getElementById('loading');
    const tableContainer = document.getElementById('table-container');
    const error = document.getElementById('error');
    
    if (isLoading) {
        loading.style.display = 'block';
        tableContainer.style.display = 'none';
        error.style.display = 'none';
    } else {
        loading.style.display = 'none';
        tableContainer.style.display = 'block';
    }
}

// Show error state
function showError() {
    const loading = document.getElementById('loading');
    const tableContainer = document.getElementById('table-container');
    const error = document.getElementById('error');
    
    loading.style.display = 'none';
    tableContainer.style.display = 'none';
    error.style.display = 'block';
}

// Initialize the application
async function init() {
    setLoading(true);
    
    try {
        await fetchTeamRecords();
        const playerData = calculatePlayerTotals();
        renderTable(playerData);
        updateLastUpdated();
        setLoading(false);
    } catch (error) {
        console.error('Error initializing app:', error);
        showError();
    }
}

// Auto-refresh every 30 minutes
setInterval(init, 30 * 60 * 1000);

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
