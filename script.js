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

// Benefit details content
const benefitDetails = {
    recovery: {
        title: "Fast Recovery Features",
        description: `
            <p>Our DRaaS solution ensures minimal downtime with industry-leading recovery capabilities:</p>
            <ul>
                <li><strong>Rapid Recovery Time Objective (RTO):</strong> Restore operations within minutes</li>
                <li><strong>Automated Recovery:</strong> One-click restoration process</li>
                <li><strong>Continuous Data Protection:</strong> Recovery points as recent as 5 minutes</li>
                <li><strong>Parallel Recovery:</strong> Restore multiple systems simultaneously</li>
                <li><strong>Testing Capabilities:</strong> Regular recovery testing without disruption</li>
            </ul>
        `
    },
    storage: {
        title: "Secure Storage Solutions",
        description: `
            <p>Enterprise-grade security features protect your backup data:</p>
            <ul>
                <li><strong>Immutable Storage:</strong> Prevents unauthorized modification of backups</li>
                <li><strong>End-to-End Encryption:</strong> AES-256 encryption for data at rest and in transit</li>
                <li><strong>Air-gapped Backups:</strong> Isolated storage for maximum protection</li>
                <li><strong>Version Control:</strong> Multiple recovery points for each backup</li>
                <li><strong>Compliance:</strong> Meets industry standards and regulations</li>
            </ul>
        `
    },
    cloud: {
        title: "Cloud-Based Advantages",
        description: `
            <p>Leverage the power of cloud technology for your disaster recovery:</p>
            <ul>
                <li><strong>Global Accessibility:</strong> Access your backups from anywhere</li>
                <li><strong>Scalable Storage:</strong> Automatically adjust storage capacity</li>
                <li><strong>Geographic Redundancy:</strong> Multiple data center locations</li>
                <li><strong>Cost-Effective:</strong> Pay only for what you use</li>
                <li><strong>24/7 Availability:</strong> Always-on backup and recovery services</li>
            </ul>
        `
    }
};

// Show benefit details in modal
function showBenefitDetails(benefitType) {
    const modal = document.getElementById('benefitModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const details = benefitDetails[benefitType];

    modalTitle.textContent = details.title;
    modalDescription.innerHTML = details.description;
    modal.style.display = 'block';

    // Add click event to close button
    const closeButton = document.querySelector('.close-button');
    closeButton.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Start the simulation when the page loads
window.onload = initSimulation;