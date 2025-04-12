// Initialize the simulation state
let simulationState = {
    isAttacked: false,
    isRecovering: false,
    lastBackupTime: new Date(),
    recoveryPoint: new Date()
};

// Add a log entry to the simulation log
function addLogEntry(message, type = 'info') {
    const logContainer = document.getElementById('logContainer');
    const logEntry = document.createElement('div');
    logEntry.className = `log-entry ${type}`;
    
    const timestamp = new Date().toLocaleTimeString();
    logEntry.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
    
    logContainer.appendChild(logEntry);
    logContainer.scrollTop = logContainer.scrollHeight;
}

// Update the timeline visualization
function updateTimeline() {
    const normal = document.getElementById('timeline-normal');
    const attack = document.getElementById('timeline-attack');
    const recovery = document.getElementById('timeline-recovery');

    normal.classList.remove('active');
    attack.classList.remove('active');
    recovery.classList.remove('active');

    if (simulationState.isRecovering) {
        recovery.classList.add('active');
    } else if (simulationState.isAttacked) {
        attack.classList.add('active');
    } else {
        normal.classList.add('active');
    }
}

// Update the status display
function updateStatus() {
    const backupStatus = document.getElementById('backupStatus');
    const lastBackup = document.getElementById('lastBackup');
    const recoveryPoint = document.getElementById('recoveryPoint');

    if (simulationState.isRecovering) {
        backupStatus.innerHTML = 'Recovering <i class="fas fa-sync-alt fa-spin"></i>';
        backupStatus.className = 'recovering';
    } else if (simulationState.isAttacked) {
        backupStatus.innerHTML = 'Compromised <i class="fas fa-exclamation-circle"></i>';
        backupStatus.className = 'compromised';
    } else {
        backupStatus.innerHTML = 'OK <i class="fas fa-check-circle"></i>';
        backupStatus.className = 'ok';
    }

    lastBackup.textContent = simulationState.lastBackupTime.toLocaleTimeString();
    recoveryPoint.textContent = simulationState.recoveryPoint.toLocaleTimeString();
}

// Simulate a ransomware attack
function simulateAttack() {
    if (simulationState.isAttacked) {
        addLogEntry('System is already under attack!', 'warning');
        return;
    }

    simulationState.isAttacked = true;
    simulationState.isRecovering = false;
    
    updateTimeline();
    updateStatus();
    
    addLogEntry('⚠️ Ransomware attack detected! Files are being encrypted...', 'danger');
    addLogEntry('Critical systems compromised', 'danger');
    addLogEntry('Attempting to access backup systems...', 'info');
}

// Restore from backup
function restoreBackup() {
    if (!simulationState.isAttacked) {
        addLogEntry('No attack detected. System is already healthy.', 'info');
        return;
    }

    simulationState.isRecovering = true;
    updateTimeline();
    updateStatus();
    
    addLogEntry('Initiating recovery process...', 'info');
    addLogEntry('Connecting to DRaaS cloud backup...', 'info');
    
    // Simulate recovery process
    setTimeout(() => {
        simulationState.isAttacked = false;
        simulationState.isRecovering = false;
        simulationState.lastBackupTime = new Date();
        
        updateTimeline();
        updateStatus();
        
        addLogEntry('✅ Backup restored successfully!', 'success');
        addLogEntry('All systems operational', 'success');
    }, 3000);
}

// Initialize the simulation
function initSimulation() {
    updateStatus();
    updateTimeline();
    addLogEntry('System initialized and running normally', 'info');
}

// Start the simulation when the page loads
window.onload = initSimulation;
