import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsersService } from './modulos/users/users.service';
import { SourcesService } from './modulos/sources/sources.service';
import { ThreatsService } from './modulos/threats/threats.service';
import { AlertsService } from './modulos/alerts/alerts.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const sourcesService = app.get(SourcesService);
  const threatsService = app.get(ThreatsService);
  const alertsService = app.get(AlertsService);

  console.log('🌱 Seeding database...');
  console.log('🗑️  Clearing existing data...');

  // Get repositories to clear data using TypeORM repositories
  const { DataSource } = await import('typeorm');
  const dataSource = app.get(DataSource);
  
  // Clear all tables in correct order (respecting foreign keys)
  // Using TRUNCATE with CASCADE to handle foreign keys
  try {
    await dataSource.query('TRUNCATE TABLE "alerts" RESTART IDENTITY CASCADE');
    await dataSource.query('TRUNCATE TABLE "threats" RESTART IDENTITY CASCADE');
    await dataSource.query('TRUNCATE TABLE "sources" RESTART IDENTITY CASCADE');
    await dataSource.query('TRUNCATE TABLE "users" RESTART IDENTITY CASCADE');
  } catch (error) {
    console.log('⚠️  Tables might not exist yet, creating them...');
    // If tables don't exist, synchronize the schema
    await dataSource.synchronize();
  }
  
  console.log('✅ Database cleared');

  // Create admin user
  const admin = await usersService.create({
    email: 'admin@threatscope.com',
    username: 'admin',
    password: 'Admin123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  });
  console.log('✅ Admin user created');

  // Create analyst user
  const analyst = await usersService.create({
    email: 'analyst@threatscope.com',
    username: 'analyst',
    password: 'Analyst123!',
    firstName: 'Security',
    lastName: 'Analyst',
    role: 'analyst',
  });
  console.log('✅ Analyst user created');

  // Create second analyst
  const analyst2 = await usersService.create({
    email: 'israel.valderrama@threatscope.com',
    username: 'ivalderrama',
    password: 'Analyst123!',
    firstName: 'Israel',
    lastName: 'Valderrama',
    role: 'analyst',
  });
  console.log('✅ Second analyst user created');

  // Create sources
  const source1 = await sourcesService.create({
    name: 'AlienVault OTX',
    description: 'Open Threat Exchange - Global threat intelligence feed',
    type: 'feed',
    url: 'https://otx.alienvault.com/api/v1/pulses',
    status: 'active',
  });

  const source2 = await sourcesService.create({
    name: 'Internal SIEM',
    description: 'Corporate SIEM system - Splunk Enterprise',
    type: 'siem',
    url: 'https://siem.internal.corp',
    status: 'active',
  });

  const source3 = await sourcesService.create({
    name: 'Honeypot Network',
    description: 'Distributed honeypot sensors across DMZ',
    type: 'honeypot',
    url: 'https://honeypot.threatscope.com',
    status: 'active',
  });

  const source4 = await sourcesService.create({
    name: 'VirusTotal API',
    description: 'File and URL analysis service',
    type: 'api',
    url: 'https://www.virustotal.com/api/v3',
    status: 'active',
  });

  const source5 = await sourcesService.create({
    name: 'Abuse.ch',
    description: 'Malware sample and C2 tracker',
    type: 'feed',
    url: 'https://abuse.ch/api',
    status: 'active',
  });

  const source6 = await sourcesService.create({
    name: 'Threat Intelligence Manual',
    description: 'Manual threat reports from security team',
    type: 'manual',
    status: 'active',
  });

  const source7 = await sourcesService.create({
    name: 'MISP Feed',
    description: 'Malware Information Sharing Platform',
    type: 'feed',
    url: 'https://misp.threatscope.com/feeds',
    status: 'active',
  });

  const source8 = await sourcesService.create({
    name: 'PhishTank',
    description: 'Collaborative phishing database',
    type: 'api',
    url: 'https://checkurl.phishtank.com/checkurl',
    status: 'inactive',
  });

  console.log('✅ Sources created');

  // Create threats - Many realistic examples
  const threat1 = await threatsService.create({
    title: 'Ransomware Campaign Detected - LockBit 3.0',
    description: 'Nueva variante de ransomware LockBit 3.0 detectada atacando al sector healthcare. Utiliza técnicas de cifrado avanzadas y exfiltración de datos antes del cifrado.',
    type: 'ransomware',
    severity: 'critical',
    status: 'active',
    indicators: ['malicious-domain.com', '192.168.1.100', '5f4dcc3b5aa765d61d8327deb882cf99'],
    affectedSystems: ['Server-01', 'Workstation-15', 'DB-Primary'],
    sourceId: source1.id,
    detectedAt: new Date().toISOString(),
  });

  const threat2 = await threatsService.create({
    title: 'Phishing Campaign - Office 365 Credential Harvesting',
    description: 'Campaña masiva de phishing dirigida a usuarios de Office 365. Los correos contienen enlaces a páginas falsas que imitan el portal de inicio de sesión de Microsoft.',
    type: 'phishing',
    severity: 'high',
    status: 'monitoring',
    indicators: ['fake-login.com', 'phishing@attacker.net', 'microsoft-login-secure.tk'],
    sourceId: source2.id,
    detectedAt: new Date().toISOString(),
  });

  const threat3 = await threatsService.create({
    title: 'DDoS Attack Pattern - Layer 7 Flood',
    description: 'Ataque DDoS distribuido de capa 7 detectado contra servidores web públicos. Tráfico proveniente de múltiples ubicaciones geográficas.',
    type: 'ddos',
    severity: 'high',
    status: 'mitigated',
    indicators: ['203.0.113.0/24', '198.51.100.0/24'],
    sourceId: source3.id,
    detectedAt: new Date(Date.now() - 86400000).toISOString(),
  });

  const threat4 = await threatsService.create({
    title: 'Zero-Day Exploit CVE-2024-1234',
    description: 'Vulnerabilidad crítica de día cero en framework web popular. Permite ejecución remota de código sin autenticación.',
    type: 'zero_day',
    severity: 'critical',
    status: 'active',
    cveId: 'CVE-2024-1234',
    mitigation: 'Aplicar parche de emergencia inmediatamente y aislar sistemas afectados',
    sourceId: source1.id,
    detectedAt: new Date().toISOString(),
  });

  const threat5 = await threatsService.create({
    title: 'Malware Emotet - Nueva Variante Detectada',
    description: 'Nueva cepa de Emotet detectada con capacidades de propagación mejoradas. Se distribuye mediante documentos de Microsoft Office con macros maliciosas.',
    type: 'malware',
    severity: 'high',
    status: 'active',
    indicators: ['emotet-c2.com', '185.220.101.23', 'invoice_2024.doc.exe'],
    affectedSystems: ['Workstation-08', 'Workstation-22'],
    sourceId: source5.id,
    detectedAt: new Date(Date.now() - 3600000).toISOString(),
  });

  const threat6 = await threatsService.create({
    title: 'APT Group - Persistent Access Detected',
    description: 'Actividad de grupo APT (Advanced Persistent Threat) detectada en la red. Indicios de acceso persistente y movimiento lateral.',
    type: 'apt',
    severity: 'critical',
    status: 'monitoring',
    indicators: ['backdoor.php', '192.168.50.15', 'C:\\Windows\\Temp\\svchost.exe'],
    affectedSystems: ['Web-Server-02', 'File-Server-01'],
    sourceId: source2.id,
    detectedAt: new Date(Date.now() - 7200000).toISOString(),
  });

  const threat7 = await threatsService.create({
    title: 'Data Breach Attempt - SQL Injection',
    description: 'Intento de filtración de datos mediante inyección SQL detectado en aplicación web. Múltiples intentos de extracción de credenciales.',
    type: 'data_breach',
    severity: 'high',
    status: 'mitigated',
    indicators: ["' OR '1'='1", 'UNION SELECT', 'attacker-ip:45.142.120.15'],
    sourceId: source3.id,
    detectedAt: new Date(Date.now() - 10800000).toISOString(),
  });

  const threat8 = await threatsService.create({
    title: 'Cryptomining Malware - XMRig Detected',
    description: 'Software de minería de criptomonedas no autorizado detectado en múltiples endpoints. Alto consumo de CPU detectado.',
    type: 'malware',
    severity: 'medium',
    status: 'resolved',
    indicators: ['xmrig.exe', 'pool.minexmr.com:4444', 'cryptonight_v8'],
    affectedSystems: ['Desktop-10', 'Desktop-11', 'Desktop-12'],
    sourceId: source2.id,
    detectedAt: new Date(Date.now() - 172800000).toISOString(),
  });

  const threat9 = await threatsService.create({
    title: 'Phishing - LinkedIn Fake Job Offers',
    description: 'Campaña de phishing mediante ofertas de trabajo falsas en LinkedIn. Los enlaces redirigen a sitios de descarga de malware.',
    type: 'phishing',
    severity: 'medium',
    status: 'resolved',
    indicators: ['linkedin-jobs-secure.xyz', 'career-opportunity.tk'],
    sourceId: source4.id,
    detectedAt: new Date(Date.now() - 259200000).toISOString(),
  });

  const threat10 = await threatsService.create({
    title: 'Ransomware - BlackCat/ALPHV Activity',
    description: 'Indicadores de actividad del grupo de ransomware BlackCat/ALPHV. Múltiples intentos de acceso mediante credenciales comprometidas.',
    type: 'ransomware',
    severity: 'critical',
    status: 'active',
    indicators: ['alphv-c2-server.onion', '192.168.1.150', 'ransom_note.txt'],
    sourceId: source1.id,
    detectedAt: new Date(Date.now() - 1800000).toISOString(),
  });

  const threat11 = await threatsService.create({
    title: 'Malware - TrickBot Banking Trojan',
    description: 'Troyano bancario TrickBot detectado. Capaz de robar credenciales bancarias, billeteras de criptomonedas y credenciales de correo.',
    type: 'malware',
    severity: 'high',
    status: 'monitoring',
    indicators: ['trickbot-payload.exe', '45.142.212.61', 'C:\\ProgramData\\Microsoft\\svhost32.exe'],
    affectedSystems: ['Accounting-PC-05'],
    sourceId: source5.id,
    detectedAt: new Date(Date.now() - 5400000).toISOString(),
  });

  const threat12 = await threatsService.create({
    title: 'DDoS - Memcached Amplification Attack',
    description: 'Ataque DDoS de amplificación utilizando servidores Memcached mal configurados. Tráfico amplificado detectado.',
    type: 'ddos',
    severity: 'medium',
    status: 'mitigated',
    indicators: ['UDP:11211', 'Amplification Factor: 51,000x'],
    sourceId: source3.id,
    detectedAt: new Date(Date.now() - 432000000).toISOString(),
  });

  const threat13 = await threatsService.create({
    title: 'Zero-Day - Apache Log4j RCE (Log4Shell)',
    description: 'Explotación activa de vulnerabilidad Log4Shell detectada. Intentos de ejecución remota de código mediante JNDI injection.',
    type: 'zero_day',
    severity: 'critical',
    status: 'mitigated',
    cveId: 'CVE-2021-44228',
    mitigation: 'Actualizar Log4j a versión 2.17.0 o superior. Aplicar WAF rules.',
    indicators: ['${jndi:ldap:', '${jndi:rmi:', 'log4j-payload.class'],
    sourceId: source7.id,
    detectedAt: new Date(Date.now() - 864000000).toISOString(),
  });

  const threat14 = await threatsService.create({
    title: 'APT - Cobalt Strike Beacon Detected',
    description: 'Beacon de Cobalt Strike detectado en red interna. Herramienta legítima de red team siendo utilizada maliciosamente.',
    type: 'apt',
    severity: 'critical',
    status: 'active',
    indicators: ['beacon.dll', '192.168.10.50', 'malleable-c2-profile'],
    affectedSystems: ['Jump-Server-01'],
    sourceId: source2.id,
    detectedAt: new Date(Date.now() - 9000000).toISOString(),
  });

  const threat15 = await threatsService.create({
    title: 'Phishing - CEO Fraud / BEC Attack',
    description: 'Ataque de Business Email Compromise (BEC) detectado. Suplantación del CEO solicitando transferencias bancarias urgentes.',
    type: 'phishing',
    severity: 'high',
    status: 'resolved',
    indicators: ['ceo@company-secure.tk', 'urgent-payment-request.pdf'],
    sourceId: source6.id,
    detectedAt: new Date(Date.now() - 604800000).toISOString(),
  });

  const threat16 = await threatsService.create({
    title: 'Data Breach - Exposed S3 Bucket',
    description: 'Bucket de AWS S3 con configuración pública detectado. Contiene información sensible de clientes accesible públicamente.',
    type: 'data_breach',
    severity: 'critical',
    status: 'resolved',
    indicators: ['s3://company-backup-prod', 'customer-database.sql', '1.2M records exposed'],
    sourceId: source6.id,
    detectedAt: new Date(Date.now() - 1209600000).toISOString(),
  });

  const threat17 = await threatsService.create({
    title: 'Malware - Qakbot/Qbot Distribution',
    description: 'Campaña de distribución de Qakbot detectada mediante adjuntos de correo maliciosos. Puerta trasera con capacidades de ladrón de información.',
    type: 'malware',
    severity: 'high',
    status: 'monitoring',
    indicators: ['invoice_Q42024.zip', 'qakbot-c2.com', 'explorer32.exe'],
    sourceId: source5.id,
    detectedAt: new Date(Date.now() - 14400000).toISOString(),
  });

  const threat18 = await threatsService.create({
    title: 'Ransomware - Conti Group Infrastructure',
    description: 'Infraestructura del grupo Conti detectada escaneando la red. Preparación para posible ataque de ransomware.',
    type: 'ransomware',
    severity: 'high',
    status: 'mitigated',
    indicators: ['conti-affiliate.onion', 'port-scan:445,3389,22'],
    sourceId: source3.id,
    detectedAt: new Date(Date.now() - 18000000).toISOString(),
  });

  const threat19 = await threatsService.create({
    title: 'Malware - AsyncRAT Remote Access Trojan',
    description: 'Troyano de acceso remoto AsyncRAT detectado. Permite control completo del sistema infectado y robo de credenciales.',
    type: 'malware',
    severity: 'medium',
    status: 'resolved',
    indicators: ['async-client.exe', '188.166.77.88:6606', 'keylogger.dll'],
    sourceId: source4.id,
    detectedAt: new Date(Date.now() - 2592000000).toISOString(),
  });

  const threat20 = await threatsService.create({
    title: 'DDoS - NTP Amplification Attack',
    description: 'Ataque de amplificación utilizando servidores NTP públicos. Tráfico dirigido a infraestructura DNS.',
    type: 'ddos',
    severity: 'low',
    status: 'resolved',
    indicators: ['UDP:123', 'monlist command', 'reflection-attack'],
    sourceId: source3.id,
    detectedAt: new Date(Date.now() - 5184000000).toISOString(),
  });

  console.log('✅ 20 Threats created with realistic data');

  // Create alerts for threats
  await alertsService.create({
    title: 'CRÍTICO: LockBit 3.0 Ransomware Detectado',
    message: 'Actividad de ransomware LockBit 3.0 detectada en múltiples sistemas. Requiere acción inmediata para contener la propagación.',
    priority: 'critical',
    status: 'pending',
    threatId: threat1.id,
  });

  await alertsService.create({
    title: 'Campaña de Phishing Office 365 Activa',
    message: 'Múltiples usuarios han reportado correos de phishing. Se han bloqueado 15 intentos de acceso sospechosos.',
    priority: 'high',
    status: 'acknowledged',
    threatId: threat2.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'Ataque DDoS Mitigado Exitosamente',
    message: 'El ataque DDoS de capa 7 ha sido mitigado. Servicios funcionando con normalidad.',
    priority: 'medium',
    status: 'resolved',
    threatId: threat3.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'URGENTE: Zero-Day CVE-2024-1234',
    message: 'Vulnerabilidad crítica de día cero requiere parche inmediato. Sistemas web en riesgo de RCE.',
    priority: 'critical',
    status: 'pending',
    threatId: threat4.id,
  });

  await alertsService.create({
    title: 'Emotet Detectado en Workstations',
    message: 'Nueva variante de Emotet detectada propagándose mediante documentos Office con macros.',
    priority: 'high',
    status: 'acknowledged',
    threatId: threat5.id,
    assignedToId: analyst2.id,
  });

  await alertsService.create({
    title: 'Grupo APT con Acceso Persistente',
    message: 'Actividad APT detectada con indicios de compromiso de larga duración. Iniciar investigación forense.',
    priority: 'critical',
    status: 'acknowledged',
    threatId: threat6.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'Intento de SQL Injection Bloqueado',
    message: 'Múltiples intentos de inyección SQL bloqueados por WAF. Aplicación web bajo ataque.',
    priority: 'high',
    status: 'resolved',
    threatId: threat7.id,
    assignedToId: analyst2.id,
  });

  await alertsService.create({
    title: 'Cryptomining Eliminado',
    message: 'Software de minería XMRig detectado y eliminado de 3 endpoints.',
    priority: 'medium',
    status: 'resolved',
    threatId: threat8.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'Campaña de Phishing LinkedIn Resuelta',
    message: 'Campaña de ofertas falsas de trabajo bloqueada. URLs maliciosas añadidas a blacklist.',
    priority: 'low',
    status: 'resolved',
    threatId: threat9.id,
    assignedToId: analyst2.id,
  });

  await alertsService.create({
    title: 'CRÍTICO: BlackCat Ransomware Activo',
    message: 'Indicadores de BlackCat/ALPHV detectados. Posible intento de compromiso mediante credenciales robadas.',
    priority: 'critical',
    status: 'pending',
    threatId: threat10.id,
  });

  await alertsService.create({
    title: 'TrickBot Banking Trojan',
    message: 'Troyano bancario TrickBot detectado en PC de contabilidad. Iniciar análisis forense.',
    priority: 'high',
    status: 'acknowledged',
    threatId: threat11.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'Ataque Memcached Amplification Contenido',
    message: 'Ataque de amplificación DDoS mitigado. Servidores Memcached asegurados.',
    priority: 'medium',
    status: 'resolved',
    threatId: threat12.id,
    assignedToId: analyst2.id,
  });

  await alertsService.create({
    title: 'Log4Shell Exploit Bloqueado',
    message: 'Múltiples intentos de explotación de Log4Shell detectados y bloqueados por WAF.',
    priority: 'high',
    status: 'resolved',
    threatId: threat13.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'CRÍTICO: Cobalt Strike Beacon Activo',
    message: 'Beacon de Cobalt Strike detectado en jump server. Posible compromiso de infraestructura.',
    priority: 'critical',
    status: 'pending',
    threatId: threat14.id,
  });

  await alertsService.create({
    title: 'CEO Fraud Detectado y Bloqueado',
    message: 'Intento de Business Email Compromise bloqueado. Usuario alertado sobre correo fraudulento.',
    priority: 'high',
    status: 'resolved',
    threatId: threat15.id,
    assignedToId: analyst2.id,
  });

  await alertsService.create({
    title: 'URGENTE: S3 Bucket Expuesto',
    message: 'Bucket S3 con datos de clientes accesible públicamente. 1.2M registros en riesgo.',
    priority: 'critical',
    status: 'resolved',
    threatId: threat16.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'Qakbot Distribution Activa',
    message: 'Campaña de distribución de Qakbot detectada. Correos maliciosos en cuarentena.',
    priority: 'high',
    status: 'acknowledged',
    threatId: threat17.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'Conti Group Scanning Detectado',
    message: 'Infraestructura Conti escaneando puertos críticos. Amenaza de ransomware mitigada.',
    priority: 'high',
    status: 'resolved',
    threatId: threat18.id,
    assignedToId: analyst2.id,
  });

  await alertsService.create({
    title: 'AsyncRAT Eliminado',
    message: 'Troyano de acceso remoto AsyncRAT detectado y eliminado. Sistema limpio.',
    priority: 'medium',
    status: 'resolved',
    threatId: threat19.id,
    assignedToId: analyst.id,
  });

  await alertsService.create({
    title: 'NTP Amplification Resuelto',
    message: 'Ataque de amplificación NTP resuelto. Servidores NTP internos asegurados.',
    priority: 'low',
    status: 'resolved',
    threatId: threat20.id,
    assignedToId: analyst2.id,
  });

  console.log('✅ 20 Alerts created');

  console.log('🎉 Database seeded successfully!');
  console.log('\n📧 Login credentials:');
  console.log('Admin: admin@threatscope.com / Admin123!');
  console.log('Analyst: analyst@threatscope.com / Analyst123!');

  await app.close();
}

seed().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
