window.__ModuleLoader__.load({
  id: '@local/dsh-grid',
  factory(require) {
    const module = { exports: {} };
    const exports = module.exports;
"use strict";var ct=Object.defineProperty;var kn=Object.getOwnPropertyDescriptor;var Nn=Object.getOwnPropertyNames;var Sn=Object.prototype.hasOwnProperty;var Cn=(t,e)=>{for(var n in e)ct(t,n,{get:e[n],enumerable:!0})},En=(t,e,n,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let l of Nn(e))!Sn.call(t,l)&&l!==n&&ct(t,l,{get:()=>e[l],enumerable:!(a=kn(e,l))||a.enumerable});return t};var In=t=>En(ct({},"__esModule",{value:!0}),t);var Wn={};Cn(Wn,{default:()=>Vn});module.exports=In(Wn);var Rn={meta:{title:"Grid",description:"Database workbench: connections with groups, colours and TLS modes, a schema browser, an editable data grid, a SQL console with completion, and saved queries \u2014 plus read-only database context for the agent."},panel:"Grid",connections:"Connections",workspaces:"Workspaces",noWorkspaces:"No workspace is registered in this profile yet.",databases:"Databases",newConnection:"New connection",newQuery:"New query",tables:"Tables",views:"Views",functions:"Functions",users:"Users",queries:"Queries",overview:"Overview",connect:"Connect",disconnect:"Disconnect",test:"Test",edit:"Edit",delete:"Delete",refresh:"Refresh",save:"Save",cancel:"Cancel",close:"Close",confirm:"Confirm",apply:"Apply",clear:"Clear",search:"Search\u2026",loading:"Loading\u2026",error:"Error",name:"Name",type:"Type",comment:"Comment",rows:"Rows",estimatedTotal:"The engine estimated this row count; Refresh asks for an exact count.",size:"Size",total:"Total",selectConnection:"Select a connection on the left to begin.",selectDatabase:"Select a database to list its objects.",emptyTables:"No tables or views in this database.",emptyTable:"This table is empty.",emptyResult:"The query returned no rows.",emptyObjects:"Nothing here yet.",data:"Data",structure:"Structure",columns:"Columns",indexes:"Indexes",ddl:"DDL",noIndexes:"No indexes.",nullable:"Nullable",default:"Default",primaryKey:"PK",insertRow:"Insert row",editRow:"Edit row",rowSaved:"Row saved",rowInserted:"Row inserted",insertRowFailed:"The row could not be inserted with its defaults.",deleteRow:"Delete row",confirmDelete:"Delete this row?",confirmDeleteConnection:"Delete this connection? Its saved password is removed too.",confirmDeleteKey:"Delete this key?",noPrimaryKey:"This table has no primary key, so rows cannot be located safely. Editing is disabled.",cellSaved:"Saved",deleted:"Deleted",saved:"Saved",copied:"Copied",page:"Page {page} of {pages}",pageSize:"Rows per page",prev:"Previous",next:"Next",selection:"Selection {n}",sum:"Sum",avg:"Avg",count:"Count",exportCsv:"Export CSV",exportJson:"Export JSON",exportInsert:"Export INSERT statements",exportMarkdown:"Export Markdown table",exportAs:"Export",importCsv:"Import CSV",importDone:"Imported {n} row(s)",importEmpty:"That file has no rows.",importNoColumns:"Open the table first so its column names are known.",importUnknownColumns:"The file has columns this table does not: {cols}",importFailed:"Imported {n} row(s), then stopped: {error}",exportTruncated:"Export limited to {n} rows",filter:"Filter",filterBuilder:"Filter builder",rawWhere:"Raw WHERE",addCondition:"Add condition",matchAll:"Match all",matchAny:"Match any",columnChooser:"Columns",showAll:"Show all",resetWidths:"Reset widths",run:"Run",cancelQuery:"Cancel",queryCancelled:"Cancelled",cancelUnsupported:"This engine cannot cancel a running statement.",runHint:"Ctrl/Cmd + Enter to run",explain:"Explain",beautify:"Beautify",history:"History",noHistory:"No queries yet.",result:"Result {n}",statementCount:"{n} statement(s)",queryOk:"{n} row(s) in {ms} ms",resultTruncated:"The result was capped: only the first 2 000 rows are shown.",queryFailed:"Failed after {ms} ms",affected:"{n} row(s) affected",noStatements:"Nothing to run.",completionHint:"Ctrl + Space for completion",readOnlyHint:"Read-only statements only",redisKeys:"Keys",redisPattern:"Pattern",redisType:"Type",scanMore:"Scan more",ttl:"TTL",noTtl:"no expiry",keyValue:"Value",command:"Command",commandHint:"e.g. GET user:1",reply:"Reply",deleteKey:"Delete key",newKey:"New key",setTtl:"Set TTL",rename:"Rename",editValue:"Edit value",saveQuery:"Save query",queryName:"Query name",querySaved:"Query saved",noQueries:"No saved queries yet. Save one from the SQL console, or ask the agent to.",openInEditor:"Open in editor",runQuery:"Run",source:"Source",bindProject:"Bind to this project",unbindProject:"Unbind project",projectBound:"This conversation can read {name} ({database}) without asking.",projectUnbound:"Not bound to this workspace. The agent has to ask which connection to use.",readOnlyForAgent:"Agent access is read-only",agentHint:"The agent can list, inspect and query these connections with grid_* tools, and save queries for you.",functionKind:"Function",procedureKind:"Procedure",returnType:"Returns",language:"Language",definition:"Definition",noRoutines:"No functions or procedures.",accountName:"User",accountHost:"Host",accountPlugin:"Plugin",accountLocked:"Locked",accountPrivileged:"Privileged",noAccounts:"No accounts are visible to this connection.",driverMissing:"The {engine} driver is not installed. Run `pnpm add {pkg}` in the plugin directory.",engineUnavailable:"Unavailable",testOk:"Connection works \xB7 {version} \xB7 {ms} ms",testFailed:"Connection failed: {error}",passwordKeep:"Leave blank to keep the saved password",secretKeep:"Saved credential exists. Leave blank to keep it; use Clear credential to remove it.",secretClear:"Clear credential",secretUndoClear:"Undo clear",secretClearPending:"This credential will be cleared on save. Typing a replacement cancels the clear.",sshSection:"SSH tunnel",sshEnable:"Connect through SSH",sshSingleHopHint:"Single jump host only. All SSH server fields and a pinned fingerprint are required.",sshHost:"SSH host",sshPort:"SSH port",sshUsername:"SSH user",sshAuthType:"SSH authentication",sshAuthPassword:"Password",sshAuthPrivateKey:"Private key",sshHostFingerprint:"Pinned SSH host fingerprint",sshFingerprintHint:"Obtain the SHA256:\u2026 host fingerprint from your administrator through a trusted channel. It is never discovered or trusted automatically.",sshPassword:"SSH password",sshPrivateKey:"SSH private key",sshPrivateKeyHint:"Paste the complete private key. Saved private keys are never read back; no host file path is read.",sshPassphrase:"Private key passphrase (optional)",sshDatabaseHostHint:"Database host is resolved from the SSH jump host. 127.0.0.1 means the jump host itself.",sshSecurityHint:"SSH does not replace database TLS. Keep database TLS enabled when required and use the database server name for certificate verification.",sshDisableHint:"Saving with SSH off removes the saved tunnel settings and SSH credentials.",sshFieldsRequired:"SSH host, user, authentication method and a pinned SHA256 host fingerprint are required.",sshPortInvalid:"SSH port must be a whole number from 1 to 65535.",sshFingerprintInvalid:"Enter a pinned SHA256 host fingerprint (SHA256: followed by 43 base64 characters, optionally ending in =).",tlsServerName:"TLS server name",tlsServerNameHint:"Leave blank to use the database host. This is the database certificate name, not the SSH host or a local forwarding address.",sqlserverVerifyCaUnsupported:"SQL Server cannot verify the certificate chain without host-name verification. Choose full verification or another supported TLS mode.",engine:"Engine",host:"Host",port:"Port",user:"User",password:"Password",database:"Database",schema:"Schema",file:"Database file",redisDb:"Database index",color:"Environment colour",identity:"Identity",group:"Group",sslDisable:"TLS off",sslRequire:"TLS, certificate not verified",sslVerifyCa:"TLS, verify certificate chain",sslVerifyFull:"TLS, verify certificate and host name",connectionLost:"Connection lost \u2014 reconnect failed.",bannerTools:"The agent can inspect and query these connections.",writesEnabled:"Writes enabled for the agent",writesDisabled:"Read-only for the agent",unsaved:"Unsaved",copyName:"Copy name",openInQuery:"Open in query",tablesCount:"{n} table(s)",viewsCount:"{n} view(s)",routinesCount:"{n} routine(s)",server:"Server",updatedAt:"Updated",version:"Version",boundProject:"Project",noGroups:"Ungrouped"},Tn={meta:{title:"Grid \u6570\u636E\u5E93",description:"\u6570\u636E\u5E93\u5DE5\u4F5C\u53F0\uFF1A\u8FDE\u63A5\uFF08\u5206\u7EC4+\u73AF\u5883\u8272\uFF09\u3001\u5E93\u8868\u6D4F\u89C8\u3001\u53EF\u7F16\u8F91\u6570\u636E\u7F51\u683C\u3001\u5E26\u8865\u5168\u7684 SQL \u63A7\u5236\u53F0\u3001\u67E5\u8BE2\u4FDD\u5B58\u4E0E\u5907\u4EFD\uFF0C\u5E76\u5411 Agent \u63D0\u4F9B\u53EA\u8BFB\u5E93\u4E0A\u4E0B\u6587\u3002"},panel:"\u6570\u636E\u5E93",connections:"\u8FDE\u63A5",workspaces:"\u5DE5\u4F5C\u533A",noWorkspaces:"\u8FD9\u4E2A profile \u91CC\u8FD8\u6CA1\u6709\u6CE8\u518C\u5DE5\u4F5C\u533A\u3002",databases:"\u6570\u636E\u5E93",newConnection:"\u65B0\u5EFA\u8FDE\u63A5",newQuery:"\u65B0\u5EFA\u67E5\u8BE2",tables:"\u8868",views:"\u89C6\u56FE",functions:"\u51FD\u6570",users:"\u7528\u6237",queries:"\u67E5\u8BE2",overview:"\u6982\u89C8",connect:"\u8FDE\u63A5",disconnect:"\u65AD\u5F00",test:"\u6D4B\u8BD5",edit:"\u7F16\u8F91",delete:"\u5220\u9664",refresh:"\u5237\u65B0",save:"\u4FDD\u5B58",cancel:"\u53D6\u6D88",close:"\u5173\u95ED",confirm:"\u786E\u5B9A",apply:"\u5E94\u7528",clear:"\u6E05\u7A7A",search:"\u641C\u7D22\u2026",loading:"\u52A0\u8F7D\u4E2D\u2026",error:"\u9519\u8BEF",name:"\u540D\u79F0",type:"\u7C7B\u578B",comment:"\u6CE8\u91CA",rows:"\u884C\u6570",estimatedTotal:"\u8BE5\u884C\u6570\u6765\u81EA\u5F15\u64CE\u4F30\u7B97\uFF1B\u70B9\u5237\u65B0\u53EF\u83B7\u53D6\u7CBE\u786E\u503C\u3002",size:"\u5927\u5C0F",total:"\u5408\u8BA1",selectConnection:"\u5728\u5DE6\u4FA7\u9009\u62E9\u4E00\u4E2A\u8FDE\u63A5\u5F00\u59CB\u3002",selectDatabase:"\u9009\u62E9\u4E00\u4E2A\u6570\u636E\u5E93\u6765\u5217\u51FA\u5B83\u7684\u5BF9\u8C61\u3002",emptyTables:"\u8FD9\u4E2A\u6570\u636E\u5E93\u91CC\u6CA1\u6709\u8868\u6216\u89C6\u56FE\u3002",emptyTable:"\u8FD9\u5F20\u8868\u8FD8\u6CA1\u6709\u6570\u636E\u3002",emptyResult:"\u67E5\u8BE2\u6CA1\u6709\u8FD4\u56DE\u4EFB\u4F55\u884C\u3002",emptyObjects:"\u8FD9\u91CC\u8FD8\u6CA1\u6709\u5185\u5BB9\u3002",data:"\u6570\u636E",structure:"\u7ED3\u6784",columns:"\u5B57\u6BB5",indexes:"\u7D22\u5F15",ddl:"DDL",noIndexes:"\u6CA1\u6709\u7D22\u5F15\u3002",nullable:"\u53EF\u7A7A",default:"\u9ED8\u8BA4\u503C",primaryKey:"\u4E3B\u952E",insertRow:"\u63D2\u5165\u884C",editRow:"\u7F16\u8F91\u884C",rowSaved:"\u884C\u5DF2\u4FDD\u5B58",rowInserted:"\u5DF2\u63D2\u5165\u4E00\u884C",insertRowFailed:"\u65E0\u6CD5\u7528\u9ED8\u8BA4\u503C\u63D2\u5165\u65B0\u884C\u3002",deleteRow:"\u5220\u9664\u884C",confirmDelete:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E00\u884C\uFF1F",confirmDeleteConnection:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u8FDE\u63A5\uFF1F\u4FDD\u5B58\u7684\u5BC6\u7801\u4E5F\u4F1A\u4E00\u5E76\u5220\u9664\u3002",confirmDeleteKey:"\u786E\u5B9A\u5220\u9664\u8FD9\u4E2A\u952E\uFF1F",noPrimaryKey:"\u8BE5\u8868\u6CA1\u6709\u4E3B\u952E\uFF0C\u65E0\u6CD5\u5B89\u5168\u5B9A\u4F4D\u884C\uFF0C\u7F16\u8F91\u5DF2\u7981\u7528\u3002",cellSaved:"\u5DF2\u4FDD\u5B58",deleted:"\u5DF2\u5220\u9664",saved:"\u5DF2\u4FDD\u5B58",copied:"\u5DF2\u590D\u5236",page:"\u7B2C {page} / {pages} \u9875",pageSize:"\u6BCF\u9875\u884C\u6570",prev:"\u4E0A\u4E00\u9875",next:"\u4E0B\u4E00\u9875",selection:"\u9009\u533A {n}",sum:"\u5408\u8BA1",avg:"\u5E73\u5747",count:"\u8BA1\u6570",exportCsv:"\u5BFC\u51FA CSV",exportJson:"\u5BFC\u51FA JSON",exportInsert:"\u5BFC\u51FA INSERT \u8BED\u53E5",exportMarkdown:"\u5BFC\u51FA Markdown \u8868\u683C",exportAs:"\u5BFC\u51FA",importCsv:"\u5BFC\u5165 CSV",importDone:"\u5DF2\u5BFC\u5165 {n} \u884C",importEmpty:"\u8FD9\u4E2A\u6587\u4EF6\u6CA1\u6709\u6570\u636E\u884C\u3002",importNoColumns:"\u8BF7\u5148\u6253\u5F00\u8BE5\u8868\uFF0C\u4EE5\u4FBF\u77E5\u9053\u5217\u540D\u3002",importUnknownColumns:"\u6587\u4EF6\u91CC\u6709\u672C\u8868\u4E0D\u5B58\u5728\u7684\u5217\uFF1A{cols}",importFailed:"\u5DF2\u5BFC\u5165 {n} \u884C\uFF0C\u968F\u540E\u4E2D\u65AD\uFF1A{error}",exportTruncated:"\u5BFC\u51FA\u4E0A\u9650\u4E3A {n} \u884C",filter:"\u7B5B\u9009",filterBuilder:"\u7B5B\u9009\u6784\u5EFA\u5668",rawWhere:"\u539F\u59CB WHERE",addCondition:"\u6DFB\u52A0\u6761\u4EF6",matchAll:"\u5168\u90E8\u6EE1\u8DB3",matchAny:"\u4EFB\u4E00\u6EE1\u8DB3",columnChooser:"\u5B57\u6BB5\u663E\u793A",showAll:"\u5168\u90E8\u663E\u793A",resetWidths:"\u91CD\u7F6E\u5217\u5BBD",run:"\u6267\u884C",cancelQuery:"\u53D6\u6D88\u6267\u884C",queryCancelled:"\u5DF2\u53D6\u6D88",cancelUnsupported:"\u8BE5\u5F15\u64CE\u65E0\u6CD5\u53D6\u6D88\u6B63\u5728\u6267\u884C\u7684\u8BED\u53E5\u3002",runHint:"Ctrl/Cmd + Enter \u6267\u884C",explain:"\u89E3\u91CA",beautify:"\u7F8E\u5316",history:"\u5386\u53F2",noHistory:"\u8FD8\u6CA1\u6709\u6267\u884C\u8FC7\u67E5\u8BE2\u3002",result:"\u7ED3\u679C {n}",statementCount:"{n} \u6761\u8BED\u53E5",queryOk:"{n} \u884C\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",resultTruncated:"\u7ED3\u679C\u5DF2\u622A\u65AD\uFF1A\u53EA\u663E\u793A\u524D 2 000 \u884C\u3002",queryFailed:"\u5931\u8D25\uFF0C\u8017\u65F6 {ms} \u6BEB\u79D2",affected:"\u5F71\u54CD {n} \u884C",noStatements:"\u6CA1\u6709\u53EF\u6267\u884C\u7684\u5185\u5BB9\u3002",completionHint:"Ctrl + Space \u5524\u8D77\u8865\u5168",readOnlyHint:"\u4EC5\u53EA\u8BFB\u8BED\u53E5",redisKeys:"\u952E",redisPattern:"\u5339\u914D\u6A21\u5F0F",redisType:"\u7C7B\u578B",scanMore:"\u7EE7\u7EED\u626B\u63CF",ttl:"\u5269\u4F59\u65F6\u95F4",noTtl:"\u6C38\u4E0D\u8FC7\u671F",keyValue:"\u503C",command:"\u547D\u4EE4",commandHint:"\u4F8B\u5982 GET user:1",reply:"\u8FD4\u56DE",deleteKey:"\u5220\u9664\u952E",newKey:"\u65B0\u5EFA\u952E",setTtl:"\u8BBE\u7F6E TTL",rename:"\u91CD\u547D\u540D",editValue:"\u7F16\u8F91\u503C",saveQuery:"\u4FDD\u5B58\u67E5\u8BE2",queryName:"\u67E5\u8BE2\u540D\u79F0",querySaved:"\u67E5\u8BE2\u5DF2\u4FDD\u5B58",noQueries:"\u8FD8\u6CA1\u6709\u4FDD\u5B58\u7684\u67E5\u8BE2\u3002\u53EF\u4EE5\u5728 SQL \u63A7\u5236\u53F0\u91CC\u4FDD\u5B58\uFF0C\u4E5F\u53EF\u4EE5\u8BA9 Agent \u5E2E\u4F60\u4FDD\u5B58\u3002",openInEditor:"\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00",runQuery:"\u6267\u884C",source:"\u6765\u6E90",bindProject:"\u7ED1\u5B9A\u5230\u5F53\u524D\u9879\u76EE",unbindProject:"\u89E3\u9664\u9879\u76EE\u7ED1\u5B9A",projectBound:"\u672C\u6B21\u5BF9\u8BDD\u53EF\u4EE5\u76F4\u63A5\u8BFB\u53D6 {name}\uFF08{database}\uFF09\uFF0C\u65E0\u9700\u53CD\u590D\u786E\u8BA4\u3002",projectUnbound:"\u5C1A\u672A\u7ED1\u5B9A\u5230\u5F53\u524D\u5DE5\u4F5C\u533A\uFF0CAgent \u9700\u8981\u5148\u8BE2\u95EE\u4F7F\u7528\u54EA\u4E2A\u8FDE\u63A5\u3002",readOnlyForAgent:"Agent \u8BBF\u95EE\u4E3A\u53EA\u8BFB",agentHint:"Agent \u53EF\u4EE5\u901A\u8FC7 grid_* \u5DE5\u5177\u5217\u51FA\u3001\u68C0\u67E5\u3001\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\uFF0C\u4E5F\u80FD\u66FF\u4F60\u4FDD\u5B58\u67E5\u8BE2\u3002",functionKind:"\u51FD\u6570",procedureKind:"\u5B58\u50A8\u8FC7\u7A0B",returnType:"\u8FD4\u56DE\u7C7B\u578B",language:"\u8BED\u8A00",definition:"\u5B9A\u4E49",noRoutines:"\u6CA1\u6709\u51FD\u6570\u6216\u5B58\u50A8\u8FC7\u7A0B\u3002",accountName:"\u7528\u6237",accountHost:"\u4E3B\u673A",accountPlugin:"\u8BA4\u8BC1\u63D2\u4EF6",accountLocked:"\u5DF2\u9501\u5B9A",accountPrivileged:"\u7279\u6743",noAccounts:"\u8BE5\u8FDE\u63A5\u770B\u4E0D\u5230\u7528\u6237\u5217\u8868\u3002",driverMissing:"\u672A\u5B89\u88C5 {engine} \u9A71\u52A8\uFF0C\u8BF7\u5728\u63D2\u4EF6\u76EE\u5F55\u6267\u884C `pnpm add {pkg}`\u3002",engineUnavailable:"\u4E0D\u53EF\u7528",testOk:"\u8FDE\u63A5\u6210\u529F \xB7 {version} \xB7 {ms} \u6BEB\u79D2",testFailed:"\u8FDE\u63A5\u5931\u8D25\uFF1A{error}",passwordKeep:"\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u5DF2\u4FDD\u5B58\u7684\u5BC6\u7801",secretKeep:"\u5DF2\u6709\u4FDD\u5B58\u7684\u51ED\u636E\uFF1B\u7559\u7A7A\u8868\u793A\u4FDD\u7559\u3002\u4EC5\u70B9\u51FB\u300C\u6E05\u7A7A\u51ED\u636E\u300D\u624D\u4F1A\u79FB\u9664\u3002",secretClear:"\u6E05\u7A7A\u51ED\u636E",secretUndoClear:"\u64A4\u9500\u6E05\u7A7A",secretClearPending:"\u4FDD\u5B58\u65F6\u5C06\u6E05\u7A7A\u6B64\u51ED\u636E\uFF1B\u8F93\u5165\u65B0\u503C\u4F1A\u53D6\u6D88\u6E05\u7A7A\u3002",sshSection:"SSH \u96A7\u9053",sshEnable:"\u901A\u8FC7 SSH \u8FDE\u63A5",sshSingleHopHint:"\u4EC5\u652F\u6301\u5355\u8DF3\uFF1BSSH \u670D\u52A1\u5668\u4FE1\u606F\u4E0E\u56FA\u5B9A\u4E3B\u673A\u6307\u7EB9\u5747\u4E3A\u5FC5\u586B\u9879\u3002",sshHost:"SSH \u4E3B\u673A",sshPort:"SSH \u7AEF\u53E3",sshUsername:"SSH \u7528\u6237\u540D",sshAuthType:"SSH \u8BA4\u8BC1\u65B9\u5F0F",sshAuthPassword:"\u5BC6\u7801",sshAuthPrivateKey:"\u79C1\u94A5",sshHostFingerprint:"\u56FA\u5B9A SSH \u4E3B\u673A\u6307\u7EB9",sshFingerprintHint:"\u8BF7\u901A\u8FC7\u7BA1\u7406\u5458\u7684\u53EF\u4FE1\u6E20\u9053\u83B7\u53D6 SHA256:\u2026 \u4E3B\u673A\u6307\u7EB9\uFF1B\u4E0D\u4F1A\u81EA\u52A8\u63A2\u6D4B\u6216\u4FE1\u4EFB\u6307\u7EB9\u3002",sshPassword:"SSH \u5BC6\u7801",sshPrivateKey:"SSH \u79C1\u94A5",sshPrivateKeyHint:"\u7C98\u8D34\u5B8C\u6574\u79C1\u94A5\u3002\u5DF2\u4FDD\u5B58\u7684\u79C1\u94A5\u4E0D\u4F1A\u56DE\u8BFB\uFF0C\u4E5F\u4E0D\u4F1A\u8BFB\u53D6\u4E3B\u673A\u4E0A\u7684\u4EFB\u610F\u8DEF\u5F84\u6587\u4EF6\u3002",sshPassphrase:"\u79C1\u94A5\u53E3\u4EE4\uFF08\u53EF\u9009\uFF09",sshDatabaseHostHint:"\u6570\u636E\u5E93\u4E3B\u673A\u4EE5 SSH \u8DF3\u677F\u673A\u7684\u89C6\u89D2\u89E3\u6790\uFF1B127.0.0.1 \u6307\u8DF3\u677F\u673A\u672C\u673A\u3002",sshSecurityHint:"SSH \u4E0D\u4EE3\u66FF\u6570\u636E\u5E93 TLS\u3002\u9700\u8981\u65F6\u4ECD\u5E94\u542F\u7528\u6570\u636E\u5E93 TLS\uFF0C\u5E76\u4F7F\u7528\u6570\u636E\u5E93\u670D\u52A1\u5668\u540D\u6821\u9A8C\u8BC1\u4E66\u3002",sshDisableHint:"\u5173\u95ED SSH \u540E\u4FDD\u5B58\u4F1A\u79FB\u9664\u5DF2\u4FDD\u5B58\u7684\u96A7\u9053\u8BBE\u7F6E\u548C SSH \u51ED\u636E\u3002",sshFieldsRequired:"\u8BF7\u586B\u5199 SSH \u4E3B\u673A\u3001\u7528\u6237\u540D\u3001\u8BA4\u8BC1\u65B9\u5F0F\u53CA\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\u3002",sshPortInvalid:"SSH \u7AEF\u53E3\u5FC5\u987B\u662F 1 \u81F3 65535 \u7684\u6574\u6570\u3002",sshFingerprintInvalid:"\u8BF7\u8F93\u5165\u56FA\u5B9A SHA256 \u4E3B\u673A\u6307\u7EB9\uFF08SHA256: \u540E\u8DDF 43 \u4E2A base64 \u5B57\u7B26\uFF0C\u53EF\u5E26\u672B\u5C3E =\uFF09\u3002",tlsServerName:"TLS \u670D\u52A1\u5668\u540D",tlsServerNameHint:"\u7559\u7A7A\u9ED8\u8BA4\u4F7F\u7528\u6570\u636E\u5E93\u4E3B\u673A\u3002\u586B\u5199\u6570\u636E\u5E93\u8BC1\u4E66\u4E0A\u7684\u670D\u52A1\u5668\u540D\uFF0C\u800C\u4E0D\u662F SSH \u4E3B\u673A\u6216\u672C\u5730\u8F6C\u53D1\u5730\u5740\u3002",sqlserverVerifyCaUnsupported:"SQL Server \u4E0D\u652F\u6301\u4EC5\u6821\u9A8C\u8BC1\u4E66\u94FE\u800C\u4E0D\u6821\u9A8C\u4E3B\u673A\u540D\uFF1B\u8BF7\u9009\u62E9\u5B8C\u6574\u6821\u9A8C\u6216\u5176\u4ED6\u652F\u6301\u7684 TLS \u6A21\u5F0F\u3002",engine:"\u5F15\u64CE",host:"\u4E3B\u673A",port:"\u7AEF\u53E3",user:"\u7528\u6237\u540D",password:"\u5BC6\u7801",database:"\u6570\u636E\u5E93",schema:"Schema",file:"\u6570\u636E\u5E93\u6587\u4EF6",redisDb:"\u5E93\u5E8F\u53F7",color:"\u73AF\u5883\u8272",identity:"\u6807\u8BC6",group:"\u5206\u7EC4",sslDisable:"\u5173\u95ED TLS",sslRequire:"TLS\uFF0C\u4E0D\u6821\u9A8C\u8BC1\u4E66",sslVerifyCa:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u94FE",sslVerifyFull:"TLS\uFF0C\u6821\u9A8C\u8BC1\u4E66\u4E0E\u4E3B\u673A\u540D",connectionLost:"\u8FDE\u63A5\u5DF2\u65AD\u5F00\uFF0C\u91CD\u8FDE\u5931\u8D25\u3002",bannerTools:"Agent \u53EF\u4EE5\u68C0\u67E5\u5E76\u67E5\u8BE2\u8FD9\u4E9B\u8FDE\u63A5\u3002",writesEnabled:"Agent \u53EF\u5199",writesDisabled:"Agent \u53EA\u8BFB",unsaved:"\u672A\u4FDD\u5B58",copyName:"\u590D\u5236\u540D\u79F0",openInQuery:"\u5728\u67E5\u8BE2\u4E2D\u6253\u5F00",tablesCount:"{n} \u5F20\u8868",viewsCount:"{n} \u4E2A\u89C6\u56FE",routinesCount:"{n} \u4E2A\u4F8B\u7A0B",server:"\u670D\u52A1\u5668",updatedAt:"\u66F4\u65B0\u65F6\u95F4",version:"\u7248\u672C",boundProject:"\u9879\u76EE",noGroups:"\u672A\u5206\u7EC4"},Pt={en:Rn,zh:Tn};var Ne=require("react");var ut=new Set("select from where group by order having limit offset join inner left right full outer cross on as and or not in is null like ilike between exists case when then else end union all distinct insert into values update set delete create table view index alter add drop truncate primary key foreign references unique default constraint cascade returning with recursive asc desc explain analyze show describe use begin commit rollback transaction if temporary materialized over partition window rows range current row unbounded preceding following fetch next only for share nowait".split(/\s+/)),pt=new Set("count sum avg min max coalesce nullif cast convert round floor ceil abs length lower upper trim ltrim rtrim substr substring replace concat concat_ws now current_timestamp current_date current_time date_trunc extract date_part to_char to_date row_number rank dense_rank ntile lag lead first_value last_value json_extract array_agg string_agg group_concat ifnull greatest least random uuid gen_random_uuid".split(/\s+/)),zt=["SELECT","FROM","WHERE","GROUP BY","ORDER BY","HAVING","LIMIT","OFFSET","UNION ALL","UNION","INSERT INTO","VALUES","UPDATE","SET","DELETE FROM","RETURNING","LEFT JOIN","RIGHT JOIN","INNER JOIN","FULL JOIN","JOIN"];function mt(t){let e=String(t??""),n=[],a=0,l=(i,g)=>{if(!g)return;let u=n[n.length-1];u&&u.type===i?u.value+=g:n.push({type:i,value:g})};for(;a<e.length;){let i=e[a],g=e.slice(a);if(i==="-"&&e[a+1]==="-"){let u=e.indexOf(`
`,a),m=u===-1?e.length:u;l("comment",e.slice(a,m)),a=m;continue}if(i==="/"&&e[a+1]==="*"){let u=e.indexOf("*/",a+2),m=u===-1?e.length:u+2;l("comment",e.slice(a,m)),a=m;continue}if(i==="'"||i==='"'||i==="`"){let u=a+1;for(;u<e.length;){if(e[u]==="\\"){u+=2;continue}if(e[u]===i){if(e[u+1]===i){u+=2;continue}u+=1;break}u+=1}l(i==="'"?"string":"ident",e.slice(a,u)),a=u;continue}if(i==="$"&&/^\$[A-Za-z_]*\$/.test(g)){let u=/^\$[A-Za-z_]*\$/.exec(g)[0],m=e.indexOf(u,a+u.length),h=m===-1?e.length:m+u.length;l("string",e.slice(a,h)),a=h;continue}if(/[0-9]/.test(i)||i==="."&&/[0-9]/.test(e[a+1]??"")){let u=/^[0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?/.exec(g);l("number",u?u[0]:i),a+=u?u[0].length:1;continue}if(/[A-Za-z_@:]/.test(i)){let m=/^[A-Za-z_@:][A-Za-z0-9_$@:]*/.exec(g)[0],h=m.toLowerCase(),S=e[a+m.length];i==="@"||i===":"?l("variable",m):ut.has(h)?l("keyword",m):S==="("||pt.has(h)?l("function",m):l("plain",m),a+=m.length;continue}if(/[(),;]/.test(i)){l("punct",i),a+=1;continue}if(/[=<>!+\-*/%|]/.test(i)){let u=/^(?:<>|!=|<=|>=|\|\||::|[-+*/%=<>])/.exec(g);l("operator",u?u[0]:i),a+=u?u[0].length:1;continue}l("ws",i),a+=1}return n}function $t(t){let e=String(t??"").trim();if(!e)return"";let n=mt(e),a=[],l="",i=0,g=()=>{let u=l.trim();u&&a.push(u),l=""};for(let u=0;u<n.length;u+=1){let m=n[u];if(m.type==="ws"){l!==""&&!l.endsWith(" ")&&(l+=" ");continue}if(m.type==="comment"){g(),a.push(m.value.trim());continue}if(m.type==="punct"){m.value==="("&&(i+=1),m.value===")"&&(i=Math.max(0,i-1)),l+=m.value;continue}if(m.type==="keyword"){let h=m.value.toUpperCase(),S=n[u+1],q=n[u+2];if(S&&S.type==="ws"&&q&&q.type==="keyword"){let W=`${h} ${q.value.toUpperCase()}`;zt.includes(W)&&(h=W,u+=2)}if(i===0&&zt.includes(h)){g(),l=`${h} `;continue}l+=`${h} `;continue}l+=m.value}return g(),a.length<2?e:a.join(`
  `).replace(/[ \t]+$/gm,"")}function Ke(t,e){let n=String(e??"");return t==="mysql"?"`"+n.replace(/`/g,"``")+"`":t==="sqlserver"?"["+n.replace(/]/g,"]]")+"]":'"'+n.replace(/"/g,'""')+'"'}function gt(t){let e=String(t??"").trim();return e===""?"''":/^-?\d+(\.\d+)?$/.test(e)?e:/^(null|true|false)$/i.test(e)?e.toUpperCase():`'${e.replace(/'/g,"''")}'`}var Dt=["=","<>",">",">=","<","<=","LIKE","NOT LIKE","IN","BETWEEN","IS NULL","IS NOT NULL"];function vt(t,e){let n=[];for(let a of e.conditions){if(!a.column)continue;let l=Ke(t,a.column),i=a.op;if(i==="IS NULL"||i==="IS NOT NULL"){n.push(`${l} ${i}`);continue}let g=String(a.value??"");if(g!==""){if(i==="IN"){let u=g.split(",").map(gt).filter(Boolean);if(u.length===0)continue;n.push(`${l} IN (${u.join(", ")})`);continue}if(i==="BETWEEN"){let u=g.split(",").map(gt);if(u.length<2)continue;n.push(`${l} BETWEEN ${u[0]} AND ${u[1]}`);continue}n.push(`${l} ${i} ${gt(g)}`)}}return n.join(` ${e.joiner} `)}function qt(t,e){let n=document.createElement("div"),a=window.getComputedStyle(t),l=["fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","padding","border","whiteSpace","wordWrap","tabSize"];for(let m of l)n.style[m]=a[m];n.style.position="absolute",n.style.visibility="hidden",n.style.width=`${t.clientWidth}px`,n.style.whiteSpace="pre-wrap",n.style.overflowWrap="break-word",n.textContent=t.value.slice(0,e);let i=document.createElement("span");i.textContent="\u200B",n.appendChild(i),document.body.appendChild(n);let g=i.offsetLeft-t.scrollLeft,u=i.offsetTop-t.scrollTop;return document.body.removeChild(n),{left:Math.max(0,g),top:u}}function he(t,e){return String(t).replace(/\{(\w+)\}/g,(n,a)=>e&&e[a]!==void 0?String(e[a]):n)}function Ue(t,e,n=300){if(t==null)return{text:e,isNull:!0,numeric:!1};if(typeof t=="object")try{let l=JSON.stringify(t);return{text:l.length>n?`${l.slice(0,n)}\u2026`:l,isNull:!1,numeric:!1}}catch{return{text:String(t),isNull:!1,numeric:!1}}let a=String(t);return{text:a.length>n?`${a.slice(0,n)}\u2026`:a,isNull:!1,numeric:typeof t=="number"}}function Xe(t){if(t==null)return"";let e=typeof t=="object"?JSON.stringify(t):String(t);return/[",\n\r]/.test(e)?`"${e.replace(/"/g,'""')}"`:e}function Lt(t){return String(t||"table").replace(/[^\w.-]+/g,"_").slice(0,60)}function Ve(t,e,n){let a=new Blob([n],{type:`${e};charset=utf-8`}),l=URL.createObjectURL(a),i=document.createElement("a");i.href=l,i.download=t,document.body.appendChild(i),i.click(),i.remove(),setTimeout(()=>URL.revokeObjectURL(l),1e3)}function Mn(t,e){return t==null?"NULL":typeof t=="number"?Number.isFinite(t)?String(t):"NULL":typeof t=="boolean"?e==="sqlserver"?t?"1":"0":t?"TRUE":"FALSE":`'${(typeof t=="object"?JSON.stringify(t):String(t)).replace(/'/g,"''")}'`}function At(t,e,n,a){let i=[e.database,...t==="postgres"||t==="sqlserver"?[e.schema]:[],e.table].filter(Boolean).map(u=>Ke(t,u)).join("."),g=n.map(u=>Ke(t,u.name)).join(", ");return a.map(u=>`INSERT INTO ${i} (${g}) VALUES (${n.map(m=>Mn(u[m.name],t)).join(", ")});`).join(`
`)}function Ht(t,e){let n=g=>g==null?"":(typeof g=="object"?JSON.stringify(g):String(g)).replace(/\|/g,"\\|").replace(/\r?\n/g," "),a=`| ${t.map(g=>n(g.name)).join(" | ")} |`,l=`| ${t.map(()=>"---").join(" | ")} |`,i=e.map(g=>`| ${t.map(u=>n(g[u.name])).join(" | ")} |`);return[a,l,...i].join(`
`)}function Kt(t){let e=String(t??"").replace(/^\uFEFF/,""),n=[],a=[],l=[],i="",g=!1,u=1,m=1,h=0,S=()=>{l.push(i),i=""},q=()=>{S(),(l.length>1||l[0]!=="")&&n.push(l),l=[]};for(;h<e.length;){let A=e[h];if(g){if(A==='"'){if(e[h+1]==='"'){i+='"',h+=2;continue}g=!1,h+=1;continue}(A===`
`||A==="\r")&&(m+=1),i+=A,h+=1;continue}if(A==='"'&&i===""){g=!0,u=m,h+=1;continue}if(A===","){S(),h+=1;continue}if(A==="\r"){h+=e[h+1]===`
`?2:1,m+=1,q();continue}if(A===`
`){h+=1,m+=1,q();continue}i+=A,h+=1}(i!==""||l.length>0)&&q(),g&&a.push(`the quoted field starting on line ${u} is not closed`);let[W=[],...w]=n,H=W.length;H===0&&a.push("the file has no header row");let M=new Set;return W.forEach((A,L)=>{let E=A.trim();E||a.push(`header field ${L+1} is empty`),M.has(E)&&a.push(`header "${E}" appears more than once`),M.add(E)}),w.forEach((A,L)=>{A.length>H&&a.push(`row ${L+2} has ${A.length} fields but the header has ${H}`)}),{header:W.map(A=>A.trim()),rows:w.map(A=>{let L=A.slice(0,H);for(;L.length<H;)L.push("");return L}),errors:a}}function Bt(t){if(!Number.isFinite(t)||t<=0)return"0 B";let e=["B","KB","MB","GB"],n=t,a=0;for(;n>=1024&&a<e.length-1;)n/=1024,a+=1;return`${n.toFixed(a===0?0:1)} ${e[a]}`}function Ft(t){let e=Date.parse(t);if(Number.isNaN(e))return"";let n=Math.max(1,Math.round((Date.now()-e)/1e3));return n<60?`${n}s`:n<3600?`${Math.round(n/60)}m`:n<86400?`${Math.round(n/3600)}h`:`${Math.round(n/86400)}d`}var Qt=require("react");var _e=class extends Error{constructor(n,a){super(n);this.status=a;this.name="ApiError"}},Pn="api/grid",ht=class{constructor(e=Pn){this.path=e}async call(e,n={},a){let l;try{l=await fetch(this.path,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action:e,...n}),...a?{signal:a}:{}})}catch(u){throw u instanceof DOMException&&u.name==="AbortError"?u:new _e(u instanceof Error?u.message:String(u),0)}let i=null;try{i=await l.json()}catch{i=null}let g=i&&typeof i=="object"?i:{};if(!l.ok||g.error)throw new _e(String(g.error??`request failed (${l.status})`),l.status);return g}meta(){return this.call("meta")}listConnections(){return this.call("connections.list")}createConnection(e){return this.call("connections.create",{connection:e})}updateConnection(e,n){return this.call("connections.update",{id:e,patch:n})}deleteConnection(e){return this.call("connections.delete",{id:e})}testConnection(e){return this.call("connections.test",{id:e})}testDraft(e,n){return this.call("connections.test",{connection:e,...n?{id:n}:{}})}connect(e){return this.call("connections.connect",{id:e})}disconnect(e){return this.call("connections.disconnect",{id:e})}sessions(){return this.call("connections.sessions")}databases(e){return this.call("databases",{connectionId:e})}relations(e,n,a){return this.call("tables",{connectionId:e,database:n,schema:a})}describe(e,n,a,l){return this.call("columns",{connectionId:e,database:n,schema:a,table:l})}rows(e,n){return this.call("rows",e,n)}updateRow(e){return this.call("rows.update",e)}insertRow(e){return this.call("rows.insert",e)}insertRows(e){return this.call("rows.insertMany",e)}deleteRow(e){return this.call("rows.delete",e)}exportRows(e){return this.call("export",e)}sql(e){return this.call("sql",e)}sqlCancel(e){return this.call("sql.cancel",{connectionId:e})}routines(e,n,a){return this.call("routines",{connectionId:e,database:n,schema:a})}accounts(e){return this.call("accounts",{connectionId:e})}listQueries(){return this.call("queries.list")}saveQuery(e){return this.call("queries.save",e)}deleteQuery(e){return this.call("queries.delete",{id:e})}bindProject(e){return this.call("projects.bind",e)}unbindProject(e){return this.call("projects.unbind",{workspaceId:e})}redisDatabases(e){return this.call("redis.databases",{connectionId:e})}redisScan(e){return this.call("redis.scan",e)}redisKey(e,n,a){return this.call("redis.key",{connectionId:e,key:n,database:a})}redisCommand(e,n){return this.call("redis.command",{connectionId:e,command:n})}redisDelete(e,n,a){return this.call("redis.delete",{connectionId:e,key:n,database:a})}engines(){return this.call("meta")}},_=new ht;var De=class{constructor(e){this.listeners=new Set;this.getSnapshot=()=>this.state;this.subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});this.state=e}setState(e){this.state=e;for(let n of this.listeners)n()}patch(e){this.setState({...this.state,...e})}};function be(t){return(0,Qt.useSyncExternalStore)(t.subscribe,t.getSnapshot,t.getSnapshot)}var ft=class extends De{constructor(){super({meta:null,error:""})}async load(){try{this.patch({meta:await _.meta(),error:""})}catch(e){this.patch({error:e instanceof Error?e.message:String(e)})}}get current(){return this.state.meta}engines(){return this.state.meta?.engines??[]}get allowWrites(){return this.state.meta?.allowWrites===!0}},Ot={status:"closed",version:"",error:"",databases:[]},bt=class extends De{constructor(){super({items:[],activeId:"",loading:!1,error:"",sessions:{},testing:{}})}async load(){this.patch({loading:!0});try{let{connections:e}=await _.listConnections(),n=this.state.items.some(a=>a.id===this.state.activeId)?this.state.activeId:e[0]?.id??"";this.patch({items:e,activeId:n,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}select(e){this.patch({activeId:e})}get active(){return this.state.items.find(e=>e.id===this.state.activeId)??null}session(e){return this.state.sessions[e]??Ot}setSession(e,n){let a=this.session(e);this.patch({sessions:{...this.state.sessions,[e]:{...a,...n}}})}async create(e){let n=await _.createConnection(e);return await this.load(),this.select(n.connection.id),n.probe}async update(e,n){await _.updateConnection(e,n),this.setSession(e,{status:"closed",version:"",databases:[]}),await this.load()}async remove(e){await _.deleteConnection(e);let n={...this.state.sessions};delete n[e],this.patch({sessions:n}),await this.load()}async test(e){this.patch({testing:{...this.state.testing,[e]:!0}});try{return await _.testConnection(e)}finally{this.patch({testing:{...this.state.testing,[e]:!1}})}}async connect(e){if(this.session(e).status!=="open"){this.setSession(e,{status:"opening",error:""});try{let n=await _.connect(e),{databases:a}=await _.databases(e);this.setSession(e,{status:"open",version:n.serverVersion,databases:a,error:""})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}}async disconnect(e){await _.disconnect(e).catch(()=>{}),this.setSession(e,{...Ot})}async reloadDatabases(e){if(this.session(e).status!=="open")return this.connect(e);try{let{databases:n}=await _.databases(e);this.setSession(e,{databases:n})}catch(n){this.setSession(e,{status:"error",error:n instanceof Error?n.message:String(n)})}}};function jt(t,e,n=""){return`${t}|${e}|${n}`}var yt=class extends De{constructor(){super({relations:{},routines:{},accounts:{},loading:{},errors:{}})}relationsOf(e){return this.state.relations[e]??[]}routinesOf(e){return this.state.routines[e]??[]}accountsOf(e){return this.state.accounts[e]??[]}isLoading(e){return this.state.loading[e]===!0}errorOf(e){return this.state.errors[e]??""}async run(e,n,a){this.patch({loading:{...this.state.loading,[e]:!0}});try{let l=await n();this.setState({...this.state,...a(l),loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:""}})}catch(l){this.setState({...this.state,loading:{...this.state.loading,[e]:!1},errors:{...this.state.errors,[e]:l instanceof Error?l.message:String(l)}})}}async loadRelations(e,n,a="",l=!1){let i=jt(e,n,a);!l&&this.state.relations[i]||await this.run(i,()=>_.relations(e,n,a),({tables:g})=>({relations:{...this.state.relations,[i]:g}}))}async loadRoutines(e,n,a="",l=!1){let i=jt(e,n,a);!l&&this.state.routines[i]||await this.run(i,()=>_.routines(e,n,a),({routines:g})=>({routines:{...this.state.routines,[i]:g}}))}async loadAccounts(e,n=!1){!n&&this.state.accounts[e]||await this.run(e,()=>_.accounts(e),({accounts:a})=>({accounts:{...this.state.accounts,[e]:a}}))}invalidate(e){let n={...this.state.relations};delete n[e],this.patch({relations:n})}},wt=class extends De{constructor(){super({tabs:[],activeId:""})}open(e){let n=this.state.tabs.some(a=>a.id===e.id);this.setState({tabs:n?this.state.tabs:this.state.tabs.concat(e),activeId:e.id})}activate(e){this.patch({activeId:e})}close(e){let n=this.state.tabs.findIndex(i=>i.id===e),a=this.state.tabs.filter(i=>i.id!==e),l=a[Math.max(0,n-1)];this.setState({tabs:a,activeId:this.state.activeId===e?l?.id??"":this.state.activeId})}closeConnection(e){let n=this.state.tabs.filter(l=>l.connectionId!==e),a=n.some(l=>l.id===this.state.activeId);this.setState({tabs:n,activeId:a?this.state.activeId:n[n.length-1]?.id??""})}get active(){return this.state.tabs.find(e=>e.id===this.state.activeId)??null}},xt=class extends De{constructor(){super({items:[],loading:!1,error:""})}async load(){this.patch({loading:!0});try{let{queries:e}=await _.listQueries();this.patch({items:e,loading:!1,error:""})}catch(e){this.patch({loading:!1,error:e instanceof Error?e.message:String(e)})}}async save(e){let{query:n}=await _.saveQuery(e);return await this.load(),n}async remove(e){await _.deleteQuery(e),await this.load()}},Ge=class{constructor(){this.meta=new ft;this.connections=new bt;this.catalog=new yt;this.tabs=new wt;this.queries=new xt}async bootstrap(){await Promise.all([this.meta.load(),this.connections.load(),this.queries.load()])}bindings(){return this.meta.current?.bindings??[]}bindingFor(e){return this.bindings().find(n=>n.workspaceId===e)??null}};var Te=require("react"),kt=require("react-dom"),j=require("react/jsx-runtime"),Vt={plus:"M12 5v14M5 12h14",refresh:"M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",play:"M8 5v14l11-7z",trash:"M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",pencil:"M4 20h4L20 8l-4-4L4 16z",chevron:"M9 6l6 6-6 6",chevronLeft:"M15 6l-6 6 6 6",database:"M12 3c4 0 7 1.3 7 3s-3 3-7 3-7-1.3-7-3 3-3 7-3zM5 6v12c0 1.7 3 3 7 3s7-1.3 7-3V6",table:"M4 5h16v14H4zM4 10h16M10 10v9",view:"M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",key:"M14 4a6 6 0 1 0-5.2 8.9L4 18v2h3v-3h3v-3h2.2A6 6 0 0 0 14 4z",search:"M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",download:"M12 4v10M8 11l4 4 4-4M5 19h14",x:"M6 6l12 12M18 6L6 18",check:"M5 13l4 4L19 7",plug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0zM12 18v3",unplug:"M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-6 6M12 18v3M4 4l16 16",filter:"M4 5h16l-6 7v6l-4 2v-8z",folder:"M3 6h6l2 2h10v11H3z",copy:"M9 9h10v10H9zM5 15V5h10",alert:"M12 4l9 16H3zM12 10v4M12 17h.01",columns:"M4 5h16M4 12h16M4 19h16",wand:"M4 20l10-10M14 5l1.5 1.5M18 3l1 2 2 .5-2 1.5.5 2-2-1-2 1 .5-2-2-1.5 2-.5z",history:"M12 8v5l3 2M4 12a8 8 0 1 0 3-6.2M4 4v4h4",function:"M9 4c-2 0-3 1-3 3v10c0 2-1 3-3 3M6 11h7M15 14l5 6M20 14l-5 6",user:"M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4 21a8 8 0 0 1 16 0",bookmark:"M6 4h12v17l-6-4-6 4z",archive:"M4 4h16v4H4zM5 8h14v12H5zM9 13h6",link:"M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1",info:"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 11v6M12 8h.01"};function T({name:t,size:e=14}){return(0,j.jsx)("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.7,strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,focusable:"false",children:(0,j.jsx)("path",{d:Vt[t]??Vt.table})})}function K(t){let e=["dg-btn"];return t.className&&e.push(t.className),t.variant&&t.variant!=="default"&&e.push(`dg-btn-${t.variant}`),t.size==="sm"&&e.push("dg-btn-sm"),t.active&&e.push("dg-btn-active"),(0,j.jsx)("button",{type:t.type??"button",className:e.join(" "),onClick:t.onClick,disabled:t.disabled,title:t.title,"aria-label":t.title,"aria-pressed":t.active,children:t.children})}function ce(t){return(0,j.jsx)("button",{type:"button",className:`dg-iconbtn${t.active?" dg-btn-active":""}`,title:t.title,"aria-label":t.title,onClick:t.onClick,disabled:t.disabled,children:(0,j.jsx)(T,{name:t.icon,size:t.size??13})})}function oe(t){return(0,j.jsxs)("label",{className:`dg-field${t.wide?" dg-field-wide":""}`,children:[(0,j.jsx)("span",{className:"dg-field-label",children:t.label}),t.children,t.hint?(0,j.jsx)("span",{className:"dg-field-hint",children:t.hint}):null]})}function se(t){let{className:e,...n}=t;return(0,j.jsx)("input",{...n,className:`dg-input${e?` ${e}`:""}`})}function Ye(t){let{className:e,...n}=t;return(0,j.jsx)("textarea",{...n,className:`dg-input dg-textarea${e?` ${e}`:""}`})}function we(t){return(0,j.jsx)("select",{...t,className:`dg-input dg-select${t.className?` ${t.className}`:""}`})}function xe({label:t}){return(0,j.jsxs)("span",{className:"dg-spinner-row",children:[(0,j.jsx)("span",{className:"dg-spinner","aria-hidden":!0}),t?(0,j.jsx)("span",{children:t}):null]})}function ye({title:t,hint:e,children:n}){return(0,j.jsxs)("div",{className:"dg-empty",children:[(0,j.jsx)("div",{className:"dg-empty-title",children:t}),e?(0,j.jsx)("div",{className:"dg-empty-hint",children:e}):null,n]})}function ue(t){return t.children?(0,j.jsxs)("div",{className:`dg-banner dg-banner-${t.tone??"info"}`,role:"status",children:[(0,j.jsx)(T,{name:t.tone==="error"?"alert":"check",size:12}),(0,j.jsx)("span",{className:"dg-banner-text",children:t.children}),t.onClose?(0,j.jsx)("button",{type:"button",className:"dg-iconbtn dg-iconbtn-tiny",onClick:t.onClose,"aria-label":"dismiss",children:(0,j.jsx)(T,{name:"x",size:10})}):null]}):null}function Wt(t){return(0,j.jsx)("div",{className:"dg-seg",children:t.options.map(e=>(0,j.jsx)("button",{type:"button",className:e.value===t.value?"dg-seg-on":"",onClick:()=>t.onChange(e.value),children:e.label},e.value))})}function Jt({status:t}){return(0,j.jsx)("span",{className:`dg-dot${t==="open"?" dg-dot-open":t==="error"?" dg-dot-error":t==="opening"?" dg-dot-busy":""}`})}function Se(t){let e=(0,Te.useRef)(null),n=(0,Te.useRef)(t.onClose);n.current=t.onClose;let a=(0,Te.useRef)(t.busy);return a.current=t.busy,(0,Te.useEffect)(()=>{let l=g=>{g.key==="Escape"&&!a.current&&(g.stopPropagation(),n.current())};document.addEventListener("keydown",l);let i=setTimeout(()=>e.current?.focus(),0);return()=>{document.removeEventListener("keydown",l),clearTimeout(i)}},[]),(0,kt.createPortal)((0,j.jsx)("div",{className:"dg-backdrop",onMouseDown:l=>{l.target===l.currentTarget&&!t.busy&&t.onClose()},children:(0,j.jsxs)("div",{className:"dg-modal",style:{width:`${t.width??520}px`},role:"dialog","aria-modal":"true","aria-label":t.title,children:[(0,j.jsxs)("div",{className:"dg-modal-head",children:[(0,j.jsxs)("div",{className:"dg-modal-title-wrap",children:[t.icon?(0,j.jsx)("span",{className:"dg-modal-icon-badge",children:(0,j.jsx)(T,{name:t.icon,size:15})}):null,(0,j.jsxs)("div",{children:[(0,j.jsx)("div",{className:"dg-modal-title",children:t.title}),t.subtitle?(0,j.jsx)("div",{className:"dg-modal-subtitle",children:t.subtitle}):null]})]}),(0,j.jsx)("button",{ref:e,type:"button",className:"dg-iconbtn",onClick:()=>!t.busy&&t.onClose(),"aria-label":"close",children:(0,j.jsx)(T,{name:"x",size:13})})]}),(0,j.jsx)("div",{className:"dg-modal-body",children:t.children}),t.footer?(0,j.jsx)("div",{className:"dg-modal-foot",children:t.footer}):null]})}),document.body)}function Be(t){let e=(0,Te.useRef)(null);(0,Te.useEffect)(()=>{let a=i=>{e.current&&!e.current.contains(i.target)&&t.onClose()},l=i=>{i.key==="Escape"&&t.onClose()};return document.addEventListener("mousedown",a),document.addEventListener("keydown",l),()=>{document.removeEventListener("mousedown",a),document.removeEventListener("keydown",l)}},[t.onClose]);let n=t.items.filter(Boolean);return(0,kt.createPortal)((0,j.jsx)("div",{ref:e,className:"dg-ctxmenu",role:"menu",style:{left:`${Math.min(t.x,window.innerWidth-200)}px`,top:`${Math.min(t.y,Math.max(8,window.innerHeight-40-n.length*26))}px`},children:n.map((a,l)=>a.separator?(0,j.jsx)("div",{className:"dg-ctxsep"},`sep-${l}`):(0,j.jsxs)("button",{type:"button",role:"menuitem",className:`dg-ctxitem${a.danger?" dg-ctxitem-danger":""}`,disabled:a.disabled,onClick:()=>{t.onClose(),a.disabled||a.onClick?.()},children:[a.icon?(0,j.jsx)(T,{name:a.icon,size:12}):null,a.label,a.hint?(0,j.jsx)("span",{className:"dg-ctxhint",children:a.hint}):null]},`${a.label}-${l}`))}),document.body)}function Ut(t){return(0,j.jsx)("div",{className:"dg-split",role:"separator","aria-orientation":"vertical",onMouseDown:n=>{n.preventDefault();let a=n.clientX,l=t.width;t.onDragging?.(!0);let i=u=>{t.setWidth(Math.max(t.min,Math.min(t.max,l+u.clientX-a)))},g=()=>{t.onDragging?.(!1),window.removeEventListener("mousemove",i),window.removeEventListener("mouseup",g)};window.addEventListener("mousemove",i),window.addEventListener("mouseup",g)}})}var Xt=`/* Grid panel styles.
 *
 * Everything is built on host theme tokens, so light/dark follows the app. Two
 * rules keep that promise honest:
 *
 * 1. \`--dsw-alias-bg-layer-1/2/3\` are all identical to \`bg-base\` in light mode
 *    (white), so a surface or a hover painted with them is invisible there. The
 *    panel therefore defines its own surfaces as a tint of \`label-primary\`,
 *    which inverts with the theme: the same declaration reads as light grey on
 *    white and as lifted grey on near-black.
 * 2. \`--dsw-alias-border-l1\` is 4% black in light mode, which is not enough to
 *    separate a header from its rows; structural lines use \`border-l2\` and cell
 *    lines a measured tint.
 *
 * Colours, radii, spacing and type sizes are declared once below as \`--dg-*\`
 * tokens; no component rule spells out a raw value.
 */

/* The layer is declared on the panel *and* on the two overlays that portal
   themselves to <body>, because they do not inherit from \`.dg-root\`. */
.dg-root,
.dg-backdrop,
.dg-ctxmenu {
  /* -- colour ------------------------------------------------------------- */
  --dg-bg: var(--dsw-alias-bg-base);
  /* Panes, toolbars and headers: a tint of the text colour, so it lifts off
     the background in both themes. */
  --dg-surface: color-mix(in srgb, var(--dsw-alias-label-primary) 3%, var(--dsw-alias-bg-base));
  /* Chips, badges, inset fields: one step further from the background. */
  --dg-surface-2: color-mix(in srgb, var(--dsw-alias-label-primary) 7%, var(--dsw-alias-bg-base));
  --dg-hover: var(--dsw-alias-interactive-bg-hover, color-mix(in srgb, var(--dsw-alias-label-primary) 6%, transparent));
  --dg-pressed: var(--dsw-alias-interactive-bg-active, color-mix(in srgb, var(--dsw-alias-label-primary) 10%, transparent));

  --dg-line: var(--dsw-alias-border-l2);
  --dg-line-soft: var(--dsw-alias-border-l1);
  /* Cell rules and row separators: strong enough to be seen in light mode,
     faint enough not to compete with the data. */
  --dg-line-cell: color-mix(in srgb, var(--dsw-alias-label-primary) 9%, transparent);
  --dg-zebra: color-mix(in srgb, var(--dsw-alias-label-primary) 4%, transparent);

  --dg-text: var(--dsw-alias-label-primary);
  --dg-text-2: var(--dsw-alias-label-secondary);
  /* \`label-tertiary\` is 3.7:1 on a light surface: an icon colour, never a text
     colour. Informational text at any size stays on \`--dg-text-2\` (5.8:1). */
  --dg-text-3: var(--dsw-alias-label-tertiary);

  /* The accent is the host's chromatic blue (deepseek-500, the same value in
     both themes). At ~4.2:1 it is a fill and glyph colour, never body text:
     text on an accent-tinted surface stays \`--dg-text\`. */
  --dg-accent: var(--dsw-alias-state-business-primary, #4176e6);
  --dg-accent-soft: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  --dg-accent-line: color-mix(in srgb, var(--dg-accent) 40%, transparent);

  --dg-error: var(--dsw-alias-state-error-primary);
  --dg-success: var(--dsw-alias-state-success-primary);
  --dg-warn: var(--dsw-alias-state-warn-primary);
  --dg-error-soft: color-mix(in srgb, var(--dg-error) 10%, transparent);
  --dg-success-soft: color-mix(in srgb, var(--dg-success) 10%, transparent);

  /* Syntax colours are the host highlighter's own palette, pulled 24% toward
     the text colour. At full strength the light-mode string (#2f9e44, 3.4:1) and
     comment (#868e96, 3.0:1) tokens are below the text threshold on white; the
     same pull moves the dark-theme tokens toward near-white, which is the
     direction they need there. The hue, and with it the app's code look, stays. */
  --dg-code-plain: var(--shiki-foreground, var(--dsw-alias-label-primary));
  --dg-code-keyword: color-mix(in srgb, var(--shiki-token-keyword, #d6336c) 76%, var(--dsw-alias-label-primary));
  --dg-code-function: color-mix(in srgb, var(--shiki-token-function, #6741d9) 76%, var(--dsw-alias-label-primary));
  --dg-code-string: color-mix(in srgb, var(--shiki-token-string, #2f9e44) 76%, var(--dsw-alias-label-primary));
  --dg-code-number: color-mix(in srgb, var(--shiki-token-constant, #1c7ed6) 76%, var(--dsw-alias-label-primary));
  --dg-code-comment: color-mix(in srgb, var(--shiki-token-comment, #868e96) 76%, var(--dsw-alias-label-primary));
  --dg-code-operator: color-mix(in srgb, var(--shiki-token-parameter, #e8590c) 76%, var(--dsw-alias-label-primary));
  --dg-code-punct: color-mix(in srgb, var(--shiki-token-punctuation, #495057) 76%, var(--dsw-alias-label-primary));
  --dg-code-variable: color-mix(in srgb, var(--shiki-token-link, #1971c2) 76%, var(--dsw-alias-label-primary));

  --dg-elev-1: var(--dsw-elevation-panel, 0 3px 8px #0000000f);
  --dg-elev-2: var(--dsw-elevation-prominent, 0 10px 30px #0000001f);
  --dg-mask: var(--dsw-alias-bg-mask-3, #0000007a);

  /* -- geometry ----------------------------------------------------------- */
  --dg-r-xs: 4px;
  --dg-r-sm: 6px;
  --dg-r-md: 8px;
  --dg-r-lg: 10px;
  --dg-r-pill: 999px;

  --dg-sp-1: 2px;
  --dg-sp-2: 4px;
  --dg-sp-3: 6px;
  --dg-sp-4: 8px;
  --dg-sp-5: 12px;
  --dg-sp-6: 16px;

  /* -- type --------------------------------------------------------------- */
  /* Four steps replace the seven ad-hoc sizes the panel used to mix, and the
     smallest one is the host's 11px floor rather than 9.5px. */
  --dg-fs-xs: 11px;
  --dg-fs-sm: 12px;
  --dg-fs-md: 13px;
  --dg-fs-lg: 18px;
  --dg-lh-tight: 1.35;
  --dg-lh-body: 1.55;
  --dg-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;

  /* -- metrics ------------------------------------------------------------ */
  --dg-row: 28px;
  --dg-ctl: 28px;
  --dg-ctl-sm: 24px;
  --dg-icon-btn: 26px;

  --dg-dur-1: 100ms;
  --dg-dur-2: 160ms;
  --dg-ease: cubic-bezier(0.2, 0, 0, 1);
}

.dg-root {
  box-sizing: border-box;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: var(--dg-bg);
  color: var(--dg-text);
  font-size: var(--dg-fs-md);
  line-height: var(--dg-lh-tight);
  overflow: hidden;
  padding-top: var(--dsh-frame-top-clearance, 0px);
  position: relative;
}
.dg-root * { box-sizing: border-box; }
.dg-root button { font: inherit; }

/* The host already hides the ring for pointer input by setting
   \`--dsw-focus-ring-color: transparent\`; reading the same variables keeps that
   behaviour instead of overriding it. */
.dg-root :focus-visible,
.dg-backdrop :focus-visible,
.dg-ctxmenu :focus-visible {
  outline: var(--dsw-focus-ring-width, 2px) solid var(--dsw-focus-ring-color, var(--dg-accent));
  outline-offset: 1px;
}

.dg-mono { font-family: var(--dg-mono); font-size: var(--dg-fs-sm); }
.dg-muted { color: var(--dg-text-2); }
/* For the one-line notes that used to set \`fontSize\` inline. */
.dg-hint { font-size: var(--dg-fs-xs); color: var(--dg-text-2); line-height: var(--dg-lh-tight); }
.dg-truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.dg-row { display: flex; align-items: center; gap: var(--dg-sp-3); min-width: 0; }
.dg-spacer { flex: 1; min-width: 0; }

/* toolbar ------------------------------------------------------------------ */
.dg-toolbar {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  padding: var(--dg-sp-2) var(--dg-sp-4);
  padding-left: max(var(--dg-sp-4), var(--dsh-frame-leading-clearance, 12px));
  min-height: 48px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
  /* Wraps rather than clips: with \`overflow: hidden\` the rightmost buttons
     simply vanished on a narrow panel. */
  flex-wrap: wrap;
  overflow: visible;
}
.dg-toolgroup { display: flex; align-items: center; gap: var(--dg-sp-1); }
.dg-toolbar-divider { width: 1px; height: 20px; background: var(--dg-line); margin: 0 var(--dg-sp-2); flex: none; }
.dg-brand { display: flex; align-items: center; gap: var(--dg-sp-2); font-weight: 600; font-size: var(--dg-fs-md); white-space: nowrap; margin-right: var(--dg-sp-2); }
.dg-brand-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; border-radius: 8px;
  background: color-mix(in srgb, var(--dg-accent) 14%, transparent);
  color: var(--dg-accent); flex: none;
}
.dg-brand-title { font-weight: 600; letter-spacing: -0.01em; color: var(--dg-text); }

/* buttons ------------------------------------------------------------------ */
.dg-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--dg-sp-2);
  height: var(--dg-ctl); padding: 0 var(--dg-sp-4);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  color: var(--dg-text);
  font-size: var(--dg-fs-sm); cursor: pointer; white-space: nowrap;
  transition: background var(--dg-dur-1) var(--dg-ease), border-color var(--dg-dur-1) var(--dg-ease),
    color var(--dg-dur-1) var(--dg-ease), transform var(--dg-dur-1) var(--dg-ease);
}
.dg-btn:hover:not(:disabled) { background: var(--dg-hover); }
.dg-btn:active:not(:disabled) { background: var(--dg-pressed); transform: scale(0.98); }
.dg-btn:disabled { opacity: 0.42; cursor: default; }
/* The host's solid call-to-action: black on white in light mode, near-white on
   dark in dark mode. */
.dg-btn-primary {
  background: var(--dsw-alias-button-primary-fill, var(--dg-accent));
  border-color: var(--dsw-alias-button-primary-fill, var(--dg-accent));
  color: var(--dsw-alias-label-primary-inverted, #fff);
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.dg-btn-primary:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover, color-mix(in srgb, var(--dg-accent) 85%, #000));
  border-color: var(--dsw-alias-button-primary-hover, color-mix(in srgb, var(--dg-accent) 85%, #000));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}
.dg-btn-new-conn {
  background: var(--dg-accent);
  border: 1px solid var(--dg-accent);
  color: #fff;
  font-weight: 500;
  border-radius: var(--dg-r-pill);
  padding: 0 13px;
  height: var(--dg-ctl);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--dg-sp-2);
  cursor: pointer;
  white-space: nowrap;
  font-size: var(--dg-fs-sm);
  box-shadow: 0 1px 3px rgba(65, 118, 230, 0.28);
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-btn-new-conn:hover:not(:disabled) {
  background: color-mix(in srgb, var(--dg-accent) 85%, #000);
  border-color: color-mix(in srgb, var(--dg-accent) 85%, #000);
  box-shadow: 0 2px 6px rgba(65, 118, 230, 0.38);
  transform: translateY(-0.5px);
}
.dg-btn-new-conn:active:not(:disabled) {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(65, 118, 230, 0.2);
}
.dg-btn-tonal {
  background: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  border-color: transparent;
  color: var(--dg-text);
  font-weight: 500;
}
.dg-btn-tonal:hover:not(:disabled) {
  background: color-mix(in srgb, var(--dg-accent) 20%, transparent);
  color: var(--dg-text);
}
.dg-btn-danger { color: var(--dg-error); border-color: color-mix(in srgb, var(--dg-error) 38%, var(--dg-line)); }
.dg-btn-danger:hover:not(:disabled) { background: var(--dg-error-soft); }
.dg-btn-ghost { background: transparent; border-color: transparent; color: var(--dg-text-2); }
.dg-btn-ghost:hover:not(:disabled) { background: var(--dg-hover); border-color: transparent; color: var(--dg-text); }
.dg-btn-sm { height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-3); font-size: var(--dg-fs-xs); }
/* A pressed toggle is a filled state, not a coloured label. */
.dg-btn-active {
  background: var(--dg-accent-soft);
  border-color: var(--dg-accent-line);
  color: var(--dg-text);
  font-weight: 600;
}
.dg-btn-active:hover:not(:disabled) { background: color-mix(in srgb, var(--dg-accent) 18%, transparent); }

/* conversation binding assist chip ----------------------------------------- */
.dg-binding-chip {
  display: inline-flex; align-items: center; gap: 6px;
  height: 28px; padding: 0 12px;
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-pill);
  background: var(--dg-bg); color: var(--dg-text-2);
  font-size: var(--dg-fs-xs); font-weight: 500; cursor: pointer; white-space: nowrap;
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-binding-chip:hover {
  background: var(--dg-hover); color: var(--dg-text);
  border-color: color-mix(in srgb, var(--dg-accent) 30%, var(--dg-line));
  transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.06);
}
.dg-binding-chip-active {
  background: color-mix(in srgb, var(--dg-success) 10%, var(--dg-bg));
  border-color: color-mix(in srgb, var(--dg-success) 35%, transparent);
  color: var(--dg-text);
}
.dg-binding-chip-active:hover {
  background: color-mix(in srgb, var(--dg-success) 16%, var(--dg-bg));
  border-color: color-mix(in srgb, var(--dg-success) 50%, transparent);
}
.dg-binding-chip-label {
  max-width: 220px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

.dg-chip-writable {
  background: color-mix(in srgb, var(--dg-warn) 12%, transparent);
  color: var(--dg-warn); border-radius: var(--dg-r-pill);
  padding: 3px 9px; font-size: var(--dg-fs-xs); font-weight: 500; display: inline-flex; align-items: center; gap: 4px;
}
.dg-chip-readonly {
  background: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  color: var(--dg-accent); border-radius: var(--dg-r-pill);
  padding: 3px 9px; font-size: var(--dg-fs-xs); font-weight: 500; display: inline-flex; align-items: center; gap: 4px;
}

.dg-iconbtn {
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--dg-icon-btn); height: var(--dg-icon-btn);
  border: 1px solid transparent; border-radius: var(--dg-r-xs);
  background: transparent; color: var(--dg-text-2); cursor: pointer; flex: none;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-iconbtn:hover:not(:disabled) { background: var(--dg-hover); color: var(--dg-text); }
.dg-iconbtn:disabled { opacity: 0.35; cursor: default; }
.dg-iconbtn.dg-btn-active { background: var(--dg-accent-soft); color: var(--dg-text); border-color: transparent; }
.dg-iconbtn-tiny { width: 20px; height: 20px; }

/* shell -------------------------------------------------------------------- */
.dg-body { flex: 1; min-height: 0; display: flex; overflow: hidden; }
.dg-tree {
  display: flex; flex-direction: column; min-width: 0; width: 100%; flex: 1 1 auto;
  border-right: 1px solid var(--dg-line);
  background: var(--dg-surface);
}
.dg-main { flex: 1; min-width: 0; display: flex; flex-direction: column; overflow: hidden; background: var(--dg-bg); }
.dg-split { width: 6px; flex: none; cursor: col-resize; background: transparent; position: relative; z-index: 3; margin: 0 -3px; transition: background var(--dg-dur-1) var(--dg-ease); }
.dg-split:hover, .dg-split:focus-visible { background: var(--dg-accent-line); }

.dg-panehead {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 32px; padding: 0 var(--dg-sp-3);
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
  font-size: var(--dg-fs-xs); font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase;
  color: var(--dg-text-2);
}

/* tree --------------------------------------------------------------------- */
.dg-tree-scroll { flex: 1; min-height: 0; overflow: auto; padding: var(--dg-sp-2) var(--dg-sp-3) var(--dg-sp-5); }
.dg-trow {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 26px; padding: 0 var(--dg-sp-2);
  border-radius: var(--dg-r-xs);
  cursor: pointer; user-select: none; white-space: nowrap;
  transition: background var(--dg-dur-1) var(--dg-ease);
}
.dg-trow:hover { background: var(--dg-hover); }
.dg-trow-active { background: var(--dg-accent-soft); box-shadow: inset 2px 0 0 var(--dg-accent); }
.dg-trow-active:hover { background: color-mix(in srgb, var(--dg-accent) 18%, transparent); }
.dg-trow-db { padding-left: 17px; }
.dg-group {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 26px; padding: 0 var(--dg-sp-2); margin-top: var(--dg-sp-1);
  font-size: var(--dg-fs-xs); font-weight: 600; color: var(--dg-text-2);
  cursor: pointer; user-select: none; border-radius: var(--dg-r-xs);
}
.dg-group:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-twist { width: 13px; height: 13px; display: inline-flex; align-items: center; justify-content: center; color: var(--dg-text-3); flex: none; transition: transform var(--dg-dur-2) var(--dg-ease); }
.dg-twist-open { transform: rotate(90deg); }
.dg-ticon { display: inline-flex; color: var(--dg-text-3); flex: none; }
.dg-tlabel { overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; }
.dg-colorbar { width: 3px; height: 14px; border-radius: var(--dg-r-pill); flex: none; }
.dg-badge {
  font-size: var(--dg-fs-xs); line-height: 16px; padding: 0 5px;
  border-radius: var(--dg-r-xs);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  flex: none; font-variant-numeric: tabular-nums;
}
.dg-dot { width: 6px; height: 6px; border-radius: 50%; flex: none; background: var(--dsw-alias-state-idle-primary); }
.dg-dot-open { background: var(--dg-success); }
.dg-dot-busy { background: var(--dg-warn); }
.dg-dot-error { background: var(--dg-error); }
.dg-search {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 30px; padding: 0 var(--dg-sp-4);
  border: 1px solid var(--dg-line-soft); border-radius: var(--dg-r-pill);
  background: var(--dg-surface-2); color: var(--dg-text-3); flex: 1; min-width: 0;
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-search:focus-within {
  background: var(--dg-bg);
  border-color: var(--dg-accent);
  box-shadow: 0 0 0 2px var(--dg-accent-soft);
  color: var(--dg-accent);
}
.dg-search input {
  border: 0; outline: none; background: transparent; color: var(--dg-text);
  font: inherit; font-size: var(--dg-fs-xs); flex: 1; min-width: 0; height: 100%;
}
.dg-search input::placeholder { color: var(--dg-text-3); }

/* tabs --------------------------------------------------------------------- */
.dg-tabs {
  display: flex; align-items: stretch; gap: 2px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  padding: 4px 6px 0;
  flex: none; overflow-x: auto; scrollbar-width: none;
}
.dg-tabs::-webkit-scrollbar { display: none; }
.dg-tab {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 32px; padding: 0 var(--dg-sp-2) 0 var(--dg-sp-3);
  border: 1px solid transparent; border-bottom: 0;
  border-radius: 8px 8px 0 0;
  background: transparent; color: var(--dg-text-2);
  font-size: var(--dg-fs-sm); cursor: pointer; white-space: nowrap;
  max-width: 220px; position: relative;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-tab:hover { background: var(--dg-hover); color: var(--dg-text); }
/* Active tab reads continuous with content below with Google top indicator line */
.dg-tab-active {
  background: var(--dg-bg); color: var(--dg-text);
  border-color: var(--dg-line);
  font-weight: 500;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.03);
}
.dg-tab-active::after {
  content: ''; position: absolute; left: 8px; right: 8px; top: 0; height: 2.5px;
  background: var(--dg-accent); border-radius: 0 0 2px 2px;
}
.dg-tab-label { overflow: hidden; text-overflow: ellipsis; }
.dg-tab-close {
  display: inline-flex; align-items: center; justify-content: center;
  width: 20px; height: 20px; margin-left: 2px;
  border: 0; border-radius: 50%;
  background: transparent; color: var(--dg-text-3); cursor: pointer; flex: none;
  transition: all var(--dg-dur-1) var(--dg-ease);
}
.dg-tab-close:hover, .dg-tab-close:focus-visible {
  background: var(--dg-pressed); color: var(--dg-text);
}

.dg-content { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; position: relative; }
/* Wraps instead of clipping: an unreachable button is worse than a second line. */
.dg-subbar {
  display: flex; align-items: center; flex-wrap: wrap; gap: var(--dg-sp-2) var(--dg-sp-3);
  min-height: 32px; padding: var(--dg-sp-1) var(--dg-sp-4);
  border-bottom: 1px solid var(--dg-line-soft);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
}
.dg-chip {
  display: inline-flex; align-items: center; gap: var(--dg-sp-1);
  height: 20px; padding: 0 var(--dg-sp-3);
  border-radius: var(--dg-r-pill);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  font-size: var(--dg-fs-xs); white-space: nowrap; font-variant-numeric: tabular-nums;
}
.dg-chip b { color: var(--dg-text); font-weight: 600; }
.dg-tag {
  font-size: var(--dg-fs-xs); padding: 0 5px; border-radius: var(--dg-r-xs);
  background: var(--dg-surface-2); color: var(--dg-text-2);
  line-height: 17px; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap;
}
.dg-tag-strong { background: var(--dg-accent-soft); color: var(--dg-text); font-weight: 600; }

/* segmented control -------------------------------------------------------- */
.dg-seg { display: inline-flex; align-items: center; border: 1px solid var(--dg-line); border-radius: var(--dg-r-sm); overflow: hidden; flex: none; background: var(--dg-bg); }
.dg-seg button {
  height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-4);
  border: 0; border-right: 1px solid var(--dg-line-soft);
  background: transparent; color: var(--dg-text-2);
  font-size: var(--dg-fs-xs); cursor: pointer;
  transition: background var(--dg-dur-1) var(--dg-ease), color var(--dg-dur-1) var(--dg-ease);
}
.dg-seg button:last-child { border-right: 0; }
.dg-seg button:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-seg button.dg-seg-on { background: var(--dg-accent-soft); color: var(--dg-text); font-weight: 600; }

/* data grid ---------------------------------------------------------------- */
.dg-grid-wrap { flex: 1; min-height: 0; overflow: auto; position: relative; }
.dg-grid { border-collapse: separate; border-spacing: 0; font-size: var(--dg-fs-sm); min-width: 100%; }
.dg-grid th,
.dg-grid td {
  border-bottom: 1px solid var(--dg-line-cell);
  border-right: 1px solid var(--dg-line-cell);
  padding: 0 var(--dg-sp-4);
  height: var(--dg-row); text-align: left;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; vertical-align: middle;
}
.dg-grid th {
  position: sticky; top: 0; z-index: 3;
  background: var(--dg-surface);
  font-weight: 600; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
  cursor: pointer; user-select: none; padding-right: 2px;
}
.dg-grid th.dg-th-sorted { color: var(--dg-text); }
.dg-grid td { font-family: var(--dg-mono); font-size: var(--dg-fs-sm); }
.dg-grid td.dg-cell-num { text-align: right; font-variant-numeric: tabular-nums; }
.dg-grid tbody tr:nth-child(even) td { background: var(--dg-zebra); }
.dg-grid tbody tr:hover td { background: var(--dg-hover); }
.dg-grid td.dg-cell-selected,
.dg-grid tbody tr:hover td.dg-cell-selected {
  background: var(--dg-accent-soft);
  box-shadow: inset 0 0 0 1px var(--dg-accent-line);
}
.dg-grid .dg-null { color: var(--dg-text-2); font-style: italic; }
.dg-grid .dg-cell-editing { padding: 0; }
.dg-grid .dg-cell-editing input {
  width: 100%; height: 100%; min-height: 24px;
  border: 1px solid var(--dg-accent); border-radius: var(--dg-r-xs);
  background: var(--dg-bg); color: var(--dg-text);
  font: inherit; padding: 0 var(--dg-sp-3); outline: none;
}
.dg-grid th.dg-rownum,
.dg-grid td.dg-rownum {
  width: 46px; min-width: 46px; text-align: right;
  color: var(--dg-text-2); font-size: var(--dg-fs-xs);
  padding-right: var(--dg-sp-4); font-family: var(--dg-mono); font-variant-numeric: tabular-nums;
}
/* The row-number cell opens the row editor, so it has to look like a control. */
.dg-rownum-editable { cursor: pointer; }
.dg-rownum-editable:hover { color: var(--dg-accent); background: var(--dg-accent-soft); }
.dg-colkey { display: inline-flex; align-items: center; margin-left: var(--dg-sp-1); color: var(--dg-accent); vertical-align: -2px; }
.dg-sortmark { color: var(--dg-accent); font-size: 10px; margin-left: var(--dg-sp-1); }
.dg-colresize { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; }
.dg-colresize:hover { background: var(--dg-accent); }

.dg-pager {
  display: flex; align-items: center; gap: var(--dg-sp-4);
  padding: var(--dg-sp-1) var(--dg-sp-4);
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
}
.dg-pager .dg-input { height: var(--dg-ctl-sm); width: auto; padding: 0 var(--dg-sp-1); }
.dg-status {
  display: flex; align-items: center; gap: var(--dg-sp-4);
  height: 26px; padding: 0 var(--dg-sp-4);
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; font-size: var(--dg-fs-xs); color: var(--dg-text-2);
  overflow: hidden; white-space: nowrap;
}
.dg-status-item { display: inline-flex; align-items: center; gap: var(--dg-sp-1); min-width: 0; }
.dg-status b { color: var(--dg-text); font-weight: 600; }

/* list tables -------------------------------------------------------------- */
.dg-list { width: 100%; border-collapse: separate; border-spacing: 0; font-size: var(--dg-fs-sm); }
.dg-list th {
  position: sticky; top: 0; z-index: 2;
  height: 30px; padding: 0 var(--dg-sp-4);
  text-align: left; font-weight: 600; font-size: var(--dg-fs-xs);
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--dg-text-2);
  background: var(--dg-surface); border-bottom: 1px solid var(--dg-line);
  cursor: pointer; user-select: none; white-space: nowrap;
}
.dg-list td {
  height: var(--dg-row); padding: 0 var(--dg-sp-4);
  border-bottom: 1px solid var(--dg-line-cell);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.dg-list tbody tr { cursor: pointer; transition: background var(--dg-dur-1) var(--dg-ease); }
.dg-list tbody tr:hover td { background: var(--dg-hover); }
.dg-list tbody tr.dg-row-active td { background: var(--dg-accent-soft); }
.dg-list .dg-num { text-align: right; font-variant-numeric: tabular-nums; color: var(--dg-text-2); }
.dg-list-name { display: flex; align-items: center; gap: var(--dg-sp-2); }

/* forms -------------------------------------------------------------------- */
.dg-input {
  height: var(--dg-ctl); padding: 0 var(--dg-sp-3);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-xs);
  background: var(--dg-bg); color: var(--dg-text);
  font: inherit; font-size: var(--dg-fs-sm); outline: none; min-width: 0;
  transition: border-color var(--dg-dur-1) var(--dg-ease), box-shadow var(--dg-dur-1) var(--dg-ease);
}
.dg-input:focus { border-color: var(--dg-accent); box-shadow: 0 0 0 3px var(--dg-accent-soft); }
.dg-input::placeholder { color: var(--dg-text-3); }
/* Multi-line variant of the same field: rows instead of a fixed height, and the
   monospace stack because these carry JSON, SQL or notes. */
.dg-textarea { height: auto; min-height: 62px; padding: var(--dg-sp-2) var(--dg-sp-3); line-height: var(--dg-lh-body); resize: vertical; font-family: var(--dg-mono); font-size: var(--dg-fs-sm); }
textarea.dg-input { height: auto; padding: var(--dg-sp-3) var(--dg-sp-3); resize: vertical; font-family: var(--dg-mono); line-height: var(--dg-lh-body); }
.dg-select { padding-right: var(--dg-sp-1); }
.dg-field { display: flex; flex-direction: column; gap: var(--dg-sp-1); min-width: 0; }
.dg-field-wide { grid-column: 1 / -1; }
.dg-field-label { font-size: var(--dg-fs-xs); color: var(--dg-text-2); }
.dg-field-hint { font-size: var(--dg-fs-xs); color: var(--dg-text-2); line-height: var(--dg-lh-tight); }
.dg-form { display: grid; grid-template-columns: 1fr 1fr; gap: var(--dg-sp-5); }

.dg-engines { display: grid; grid-template-columns: repeat(auto-fit, minmax(128px, 1fr)); gap: var(--dg-sp-2); }
.dg-engine {
  display: flex; flex-direction: column; gap: var(--dg-sp-1); align-items: flex-start;
  padding: var(--dg-sp-3) var(--dg-sp-4);
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-md);
  background: var(--dg-bg); cursor: pointer;
  font-size: var(--dg-fs-sm); color: var(--dg-text); text-align: left;
  transition: background var(--dg-dur-1) var(--dg-ease), border-color var(--dg-dur-1) var(--dg-ease);
}
.dg-engine:hover:not(:disabled) { background: var(--dg-hover); }
.dg-engine-active { border-color: var(--dg-accent); background: var(--dg-accent-soft); }
.dg-engine:disabled { opacity: 0.45; cursor: not-allowed; }
.dg-engine-note { font-size: var(--dg-fs-xs); color: var(--dg-text-2); white-space: normal; line-height: var(--dg-lh-tight); }

/* overlays ----------------------------------------------------------------- */
.dg-backdrop {
  position: fixed; inset: 0; z-index: 60;
  display: flex; align-items: center; justify-content: center;
  background: var(--dg-mask);
  backdrop-filter: blur(2px);
  padding: var(--dg-sp-5);
  animation: dg-fade-in 140ms cubic-bezier(0, 0, 0.2, 1);
}
@keyframes dg-fade-in { from { opacity: 0; } to { opacity: 1; } }

.dg-modal {
  display: flex; flex-direction: column; max-height: 88vh;
  /* The dialog width is set by the caller; the cap keeps it usable when the
     host panel is narrower than that width. */
  width: 100%; max-width: 100%;
  border-radius: 20px;
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  animation: dg-scale-up 180ms cubic-bezier(0.1, 0.9, 0.2, 1);
}
@keyframes dg-scale-up { from { opacity: 0; transform: scale(0.96) translateY(6px); } to { opacity: 1; transform: scale(1) translateY(0); } }

.dg-modal-head {
  display: flex; align-items: center; justify-content: space-between; gap: var(--dg-sp-3);
  padding: 16px 20px;
  border-bottom: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
}
.dg-modal-title-wrap {
  display: flex; align-items: center; gap: 12px;
  flex: 1; min-width: 0;
}
.dg-modal-icon-badge {
  display: inline-flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 10px;
  background: color-mix(in srgb, var(--dg-accent) 14%, transparent);
  color: var(--dg-accent);
  flex: none;
}
.dg-modal-title {
  font-weight: 600; font-size: 15px; color: var(--dg-text);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dg-modal-subtitle {
  font-size: var(--dg-fs-xs); color: var(--dg-text-2); margin-top: 2px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.dg-modal-body {
  padding: 20px; overflow: auto; min-height: 0;
  display: flex; flex-direction: column; gap: var(--dg-sp-4);
}
.dg-modal-foot {
  display: flex; align-items: center; justify-content: flex-end; gap: var(--dg-sp-2);
  padding: 14px 20px;
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none; flex-wrap: wrap;
}
.dg-ctxmenu {
  position: fixed; z-index: 80; min-width: 176px; padding: var(--dg-sp-1);
  border-radius: var(--dg-r-md);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: var(--dg-elev-2);
}
.dg-ctxitem {
  display: flex; align-items: center; gap: var(--dg-sp-3);
  width: 100%; height: var(--dg-ctl); padding: 0 var(--dg-sp-3);
  border: 0; border-radius: var(--dg-r-xs); background: transparent;
  color: var(--dg-text); font-size: var(--dg-fs-sm); cursor: pointer; text-align: left;
}
.dg-ctxitem:hover:not(:disabled) { background: var(--dg-hover); }
.dg-ctxitem:disabled { opacity: 0.45; cursor: default; }
.dg-ctxitem-danger { color: var(--dg-error); }
.dg-ctxhint { margin-left: auto; font-size: var(--dg-fs-xs); color: var(--dg-text-2); }
.dg-ctxsep { height: 1px; margin: var(--dg-sp-1) var(--dg-sp-3); background: var(--dg-line); }

/* banners: the state is carried by the icon and a left rule, never by tinted
   text, which would not survive both themes at 4.5:1. */
.dg-banner {
  display: flex; align-items: flex-start; gap: var(--dg-sp-2);
  padding: var(--dg-sp-2) var(--dg-sp-4);
  margin: var(--dg-sp-3) var(--dg-sp-4) 0;
  border: 1px solid var(--dg-line-soft);
  border-left: 3px solid var(--dg-line);
  border-radius: var(--dg-r-sm);
  background: var(--dg-surface);
  font-size: var(--dg-fs-xs); line-height: var(--dg-lh-body);
  flex: none;
}
.dg-banner > svg { flex: none; margin-top: 2px; color: var(--dg-text-2); }
.dg-banner-text { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.dg-banner-error { border-left-color: var(--dg-error); background: var(--dg-error-soft); }
.dg-banner-error > svg { color: var(--dg-error); }
.dg-banner-success { border-left-color: var(--dg-success); background: var(--dg-success-soft); }
.dg-banner-success > svg { color: var(--dg-success); }

.dg-empty {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: var(--dg-sp-2); padding: var(--dg-sp-6); text-align: center; color: var(--dg-text-3);
  user-select: none;
}
/* Placeholder-like empty title: subtle, regular weight, muted placeholder color */
.dg-empty-title {
  font-size: 13px;
  font-weight: 400;
  color: var(--dg-text-3);
  letter-spacing: normal;
  line-height: var(--dg-lh-body);
}
.dg-empty-hint {
  font-size: var(--dg-fs-xs);
  max-width: 440px;
  line-height: var(--dg-lh-body);
  color: var(--dg-text-3);
  opacity: 0.85;
}
.dg-welcome-actions {
  display: flex; align-items: center; gap: var(--dg-sp-3); margin-top: var(--dg-sp-4);
  flex-wrap: wrap; justify-content: center;
}

/* categorized saved queries ------------------------------------------------ */
.dg-query-category {
  border: 1px solid var(--dg-line);
  border-radius: var(--dg-r-md);
  background: var(--dg-surface);
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
}
.dg-query-category-head {
  display: flex;
  align-items: center;
  gap: var(--dg-sp-2);
  padding: 8px 12px;
  background: var(--dg-surface-2);
  border-bottom: 1px solid var(--dg-line);
  font-size: var(--dg-fs-xs);
  color: var(--dg-text);
}
.dg-query-category-icon {
  display: inline-flex;
  align-items: center;
  color: var(--dg-accent);
}
.dg-query-category-title {
  font-weight: 600;
  font-size: var(--dg-fs-sm);
  color: var(--dg-text);
}
.dg-query-category-sep {
  color: var(--dg-text-3);
  margin: 0 2px;
}
.dg-query-category-db {
  font-family: var(--dg-mono);
  font-weight: 500;
  color: var(--dg-text-2);
}

.dg-spinner-row { display: inline-flex; align-items: center; gap: var(--dg-sp-1); font-size: var(--dg-fs-xs); color: var(--dg-text-2); }
.dg-spinner { width: 12px; height: 12px; border: 2px solid color-mix(in srgb, var(--dg-text-2) 30%, transparent); border-top-color: var(--dg-accent); border-radius: 50%; animation: dg-spin 0.7s linear infinite; flex: none; }
@keyframes dg-spin { to { transform: rotate(360deg); } }

.dg-toast {
  position: absolute; right: var(--dg-sp-5); bottom: 34px; z-index: 30;
  display: flex; align-items: center; gap: var(--dg-sp-2);
  max-width: min(480px, 70%); padding: var(--dg-sp-2) var(--dg-sp-4);
  border-radius: var(--dg-r-sm);
  border: 1px solid var(--dg-line);
  border-left: 3px solid var(--dg-success);
  background: var(--dg-bg);
  box-shadow: var(--dg-elev-2);
  font-size: var(--dg-fs-xs);
}
.dg-toast > svg { color: var(--dg-success); flex: none; }
.dg-toast-error { border-left-color: var(--dg-error); }
.dg-toast-error > svg { color: var(--dg-error); }

/* sql console -------------------------------------------------------------- */
.dg-sql { flex: 1; min-height: 0; display: flex; flex-direction: column; }
.dg-sql-top { display: flex; flex-direction: column; border-bottom: 1px solid var(--dg-line); min-height: 132px; flex: none; }
.dg-editor { display: flex; min-height: 132px; max-height: 46vh; position: relative; flex: 1; }
.dg-editor:focus-within { box-shadow: inset 0 0 0 1px var(--dg-accent-line); }
.dg-gutter {
  flex: none; width: 40px; padding: var(--dg-sp-4) var(--dg-sp-3) var(--dg-sp-4) 0;
  text-align: right;
  font-family: var(--dg-mono); font-size: var(--dg-fs-xs); line-height: 1.6;
  overflow: hidden; user-select: none;
  border-right: 1px solid var(--dg-line-soft);
  color: var(--dg-text-2);
}
.dg-code { position: relative; flex: 1; min-width: 0; overflow: hidden; }
.dg-hl, .dg-sql-text {
  margin: 0; padding: var(--dg-sp-4) var(--dg-sp-4);
  font-family: var(--dg-mono); font-size: var(--dg-fs-sm); line-height: 1.6;
  tab-size: 2; white-space: pre; word-wrap: normal;
}
.dg-hl { position: absolute; inset: 0; overflow: auto; color: var(--dg-text); pointer-events: none; scrollbar-width: none; }
.dg-hl::-webkit-scrollbar { display: none; }
.dg-sql-text {
  position: absolute; inset: 0; width: 100%; height: 100%;
  border: 0; outline: none; resize: none; background: transparent; color: transparent;
  -webkit-text-fill-color: transparent; caret-color: var(--dg-text); overflow: auto;
}
.dg-sql-text::selection { background: color-mix(in srgb, var(--dg-accent) 32%, transparent); -webkit-text-fill-color: transparent; }
/* Syntax colours: the host highlighter palette, adjusted for text contrast in
   the token block above. The previous hard-coded hex values were a dark-mode
   palette and painted identifiers white on white. */
.dg-tok { color: var(--dg-code-plain); }
.dg-tok-keyword { color: var(--dg-code-keyword); font-weight: 600; }
.dg-tok-function { color: var(--dg-code-function); }
.dg-tok-string { color: var(--dg-code-string); }
.dg-tok-number { color: var(--dg-code-number); }
.dg-tok-comment { color: var(--dg-code-comment); font-style: italic; }
.dg-tok-operator { color: var(--dg-code-operator); }
.dg-tok-punct { color: var(--dg-code-punct); }
.dg-tok-variable { color: var(--dg-code-variable); }
.dg-tok-ident { color: var(--dg-code-plain); }

.dg-sqlbar {
  display: flex; align-items: center; gap: var(--dg-sp-1) var(--dg-sp-2);
  padding: var(--dg-sp-3) var(--dg-sp-4);
  border-top: 1px solid var(--dg-line);
  background: var(--dg-surface);
  flex: none;
  /* Wraps for the same reason the toolbar does: \`nowrap\` + \`overflow: hidden\`
     silently cut the trailing controls off on a narrow panel. */
  flex-wrap: wrap;
}
.dg-complete {
  position: absolute; z-index: 40; min-width: 180px; max-width: 320px; max-height: 220px;
  overflow: auto; padding: var(--dg-sp-1);
  border-radius: var(--dg-r-sm);
  background: var(--dg-bg);
  border: 1px solid var(--dg-line);
  box-shadow: var(--dg-elev-2);
  font-family: var(--dg-mono); font-size: var(--dg-fs-xs);
}
.dg-complete-item { display: flex; align-items: center; gap: var(--dg-sp-3); height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-2); border-radius: var(--dg-r-xs); cursor: pointer; white-space: nowrap; }
.dg-complete-item:hover, .dg-complete-item-on { background: var(--dg-accent-soft); }
.dg-complete-kind { font-size: var(--dg-fs-xs); color: var(--dg-text-2); margin-left: auto; padding-left: var(--dg-sp-4); text-transform: uppercase; }

.dg-rtabs { display: flex; align-items: center; gap: var(--dg-sp-1); padding: var(--dg-sp-1) var(--dg-sp-3); border-bottom: 1px solid var(--dg-line); flex: none; overflow-x: auto; background: var(--dg-surface); }
.dg-rtab {
  display: inline-flex; align-items: center; gap: var(--dg-sp-1);
  height: var(--dg-ctl-sm); padding: 0 var(--dg-sp-3);
  border: 1px solid transparent; border-radius: var(--dg-r-xs);
  background: transparent; color: var(--dg-text-2); font-size: var(--dg-fs-xs);
  cursor: pointer; white-space: nowrap;
}
.dg-rtab:hover { background: var(--dg-hover); }
.dg-rtab-active { background: var(--dg-bg); color: var(--dg-text); border-color: var(--dg-line); }

/* The result area is the flex child that has to absorb the leftover height;
   without this rule the table overflowed the panel instead of scrolling. */
.dg-results { flex: 1; min-height: 0; display: flex; flex-direction: column; overflow: hidden; }
.dg-sqlmsg { padding: var(--dg-sp-4) var(--dg-sp-5); font-size: var(--dg-fs-sm); color: var(--dg-text-2); white-space: pre-wrap; overflow-wrap: anywhere; }
.dg-err {
  font-family: var(--dg-mono); font-size: var(--dg-fs-xs); line-height: var(--dg-lh-body);
  padding: var(--dg-sp-3) var(--dg-sp-4);
  border-radius: var(--dg-r-xs);
  border-left: 3px solid var(--dg-error);
  background: var(--dg-error-soft);
  color: var(--dg-text);
  white-space: pre-wrap; overflow-wrap: anywhere;
}
.dg-pre { margin: 0; font-family: var(--dg-mono); font-size: var(--dg-fs-xs); line-height: var(--dg-lh-body); white-space: pre-wrap; overflow-wrap: anywhere; color: var(--dg-text); }

/* structure ---------------------------------------------------------------- */
.dg-struct { flex: 1; min-height: 0; display: flex; overflow: hidden; }
.dg-struct-col { flex: 1; min-width: 0; display: flex; flex-direction: column; border-right: 1px solid var(--dg-line); }
.dg-struct-col:last-child { border-right: 0; }
/* The three panes do not deserve equal thirds: the field table needs room for
   four columns, the index list holds short rows, and the DDL needs the rest. */
.dg-struct-col-fields { flex: 1.6 1 0; }
.dg-struct-col-indexes { flex: 0.85 1 0; }
.dg-struct-col-ddl { flex: 1.55 1 0; }
.dg-grid-fixed { table-layout: fixed; }
.dg-struct-head {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  padding: var(--dg-sp-2) var(--dg-sp-4);
  font-size: var(--dg-fs-xs); font-weight: 600;
  letter-spacing: 0.04em; text-transform: uppercase; color: var(--dg-text-2);
  border-bottom: 1px solid var(--dg-line); flex: none; background: var(--dg-surface);
}
.dg-struct-body { flex: 1; min-height: 0; overflow: auto; padding: var(--dg-sp-3) var(--dg-sp-4); }
.dg-idx { display: flex; align-items: center; gap: var(--dg-sp-2); padding: var(--dg-sp-1) 0; font-size: var(--dg-fs-xs); flex-wrap: wrap; border-bottom: 1px solid var(--dg-line-cell); }

/* redis -------------------------------------------------------------------- */
.dg-redis { flex: 1; min-height: 0; display: flex; }
.dg-redis-list {
  width: 300px; flex: none; display: flex; flex-direction: column;
  border-right: 1px solid var(--dg-line);
  min-width: 0; background: var(--dg-surface);
}
.dg-redis-keys { flex: 1; min-height: 0; overflow: auto; padding: var(--dg-sp-2) var(--dg-sp-3); }
.dg-rkey {
  display: flex; align-items: center; gap: var(--dg-sp-2);
  height: 26px; padding: 0 var(--dg-sp-2); border-radius: var(--dg-r-xs);
  cursor: pointer; font-size: var(--dg-fs-xs); font-family: var(--dg-mono);
}
.dg-rkey:hover { background: var(--dg-hover); }
.dg-rkey-active { background: var(--dg-accent-soft); box-shadow: inset 2px 0 0 var(--dg-accent); }
.dg-rns { display: flex; align-items: center; gap: var(--dg-sp-2); height: 24px; padding: 0 var(--dg-sp-2); cursor: pointer; font-size: var(--dg-fs-xs); color: var(--dg-text-2); font-weight: 600; border-radius: var(--dg-r-xs); }
.dg-rns:hover { background: var(--dg-hover); color: var(--dg-text); }
.dg-redis-detail { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.dg-redis-console { border-top: 1px solid var(--dg-line); flex: none; padding: var(--dg-sp-3) var(--dg-sp-4); display: flex; flex-direction: column; gap: var(--dg-sp-2); background: var(--dg-surface); }

/* overview ----------------------------------------------------------------- */
.dg-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(148px, 1fr)); gap: var(--dg-sp-4); padding: var(--dg-sp-5); }
.dg-card {
  border: 1px solid var(--dg-line); border-radius: var(--dg-r-md);
  padding: var(--dg-sp-4) var(--dg-sp-5);
  background: var(--dg-surface);
  display: flex; flex-direction: column; gap: var(--dg-sp-1);
  transition: border-color var(--dg-dur-1) var(--dg-ease), background var(--dg-dur-1) var(--dg-ease);
}
.dg-card:hover { border-color: var(--dg-accent-line); }
.dg-card-value { font-size: var(--dg-fs-lg); font-weight: 600; font-variant-numeric: tabular-nums; color: var(--dg-text); }
.dg-card-label { font-size: var(--dg-fs-xs); text-transform: uppercase; letter-spacing: 0.04em; color: var(--dg-text-2); }
.dg-section { padding: var(--dg-sp-1) var(--dg-sp-5) var(--dg-sp-5); display: flex; flex-direction: column; gap: var(--dg-sp-3); }
.dg-section-title { font-size: var(--dg-fs-xs); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--dg-text-2); }

/* engine marks and tag rows ------------------------------------------------ */
.dg-logo { display: inline-flex; align-items: center; justify-content: center; border-radius: var(--dg-r-sm); flex: none; }
.dg-engine-head { display: flex; align-items: center; gap: var(--dg-sp-3); }
.dg-engine-name { font-weight: 600; }
.dg-tags { display: flex; flex-wrap: wrap; gap: var(--dg-sp-1); margin-top: var(--dg-sp-1); }
.dg-summary { margin: var(--dg-sp-1) 0 0; }
.dg-form-section { display: flex; flex-direction: column; gap: var(--dg-sp-3); border-top: 1px solid var(--dg-line-soft); padding-top: var(--dg-sp-4); }
.dg-colors { display: flex; align-items: center; gap: var(--dg-sp-3); flex-wrap: wrap; }
.dg-swatch {
  width: 22px; height: 22px; border-radius: 50%;
  border: 1px solid var(--dg-line); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; padding: 0;
  transition: box-shadow var(--dg-dur-1) var(--dg-ease);
}
.dg-swatch-none { color: var(--dg-text); }
.dg-swatch-on { box-shadow: 0 0 0 2px var(--dg-bg), 0 0 0 4px var(--dg-accent); }

/* workspace binding rows --------------------------------------------------- */
.dg-ws-row {
  border: 1px solid var(--dg-line);
  border-radius: 14px;
  padding: 14px 16px;
  display: flex; flex-direction: column; gap: 10px;
  background: var(--dg-surface);
  transition: all var(--dg-dur-2) var(--dg-ease);
}
.dg-ws-row:hover {
  border-color: color-mix(in srgb, var(--dg-accent) 30%, var(--dg-line));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
.dg-ws-head { display: flex; align-items: center; gap: 10px; min-width: 0; }
.dg-ws-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px; border-radius: 8px;
  background: var(--dg-surface-2); color: var(--dg-accent); flex: none;
}
.dg-ws-title { font-weight: 600; font-size: 13px; color: var(--dg-text); }
.dg-ws-path {
  color: var(--dg-text-2); font-size: 11px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  font-family: var(--dg-mono); opacity: 0.85; margin-top: 2px;
}
.dg-status-badge {
  display: inline-flex; align-items: center; gap: 5px;
  height: 22px; padding: 0 10px;
  border-radius: var(--dg-r-pill);
  font-size: 11px; font-weight: 500;
  background: var(--dg-surface-2); color: var(--dg-text-2);
  border: 1px solid var(--dg-line-soft);
  white-space: nowrap; flex: none;
}
.dg-status-badge-ok {
  background: color-mix(in srgb, var(--dg-success) 12%, transparent);
  color: var(--dg-success);
  border-color: color-mix(in srgb, var(--dg-success) 30%, transparent);
}
.dg-tag-accent {
  background: color-mix(in srgb, var(--dg-accent) 12%, transparent);
  color: var(--dg-accent);
}
/* Two fields side by side, with the actions on their own row */
.dg-ws-form {
  display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
  gap: var(--dg-sp-3) var(--dg-sp-4); align-items: end;
  margin-top: 4px;
}
.dg-ws-actions { grid-column: 1 / -1; display: flex; gap: var(--dg-sp-2); justify-content: flex-end; margin-top: 2px; }

@media (max-width: 720px) {
  .dg-ws-form { grid-template-columns: minmax(0, 1fr); }
  .dg-form { grid-template-columns: minmax(0, 1fr); }
  .dg-backdrop { padding: var(--dg-sp-3); }
}

/* Motion is feedback, not decoration: drop it when the user asks for less. */
@media (prefers-reduced-motion: reduce) {
  .dg-root *,
  .dg-backdrop *,
  .dg-ctxmenu * {
    transition-duration: 1ms !important;
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
  }
}
`;var Ie=require("react");var v=require("react/jsx-runtime"),$n={mysql:{color:"#e48e00",glyph:"cylinder"},postgres:{color:"#336791",glyph:"cylinder"},sqlite:{color:"#0f80cc",glyph:"file"},sqlserver:{color:"#cc2927",glyph:"cylinder"},redis:{color:"#dc382d",glyph:"layers"}},Dn={mysql:["TCP",":3306","mysql2"],postgres:["TCP",":5432","pg"],sqlite:["file","built-in"],sqlserver:["TDS",":1433","mssql"],redis:["TCP",":6379","ioredis"]},qn=[{value:"none",color:"var(--dsw-alias-border-l2)"},{value:"green",color:"var(--dsw-alias-state-success-primary)"},{value:"yellow",color:"var(--dsw-alias-state-warn-primary)"},{value:"red",color:"var(--dsw-alias-state-error-primary)"}];function Ln({engine:t,size:e=26}){let n=$n[t]??{color:"#6b7280",glyph:"cylinder"},a=n.glyph==="layers"?"M12 4l7 3.5-7 3.5-7-3.5zM5 12l7 3.5 7-3.5M5 16.5l7 3.5 7-3.5":n.glyph==="file"?"M7 3h7l4 4v14H7zM10 12h5M10 16h5":"M12 4c3.9 0 6 1.1 6 2.5S15.9 9 12 9 6 7.9 6 6.5 8.1 4 12 4zM6 6.5v11c0 1.4 2.1 2.5 6 2.5s6-1.1 6-2.5v-11";return(0,v.jsx)("span",{className:"dg-logo",style:{width:e,height:e,background:n.color},"aria-hidden":!0,children:(0,v.jsx)("svg",{width:e*.68,height:e*.68,viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round",children:(0,v.jsx)("path",{d:a})})})}function Ze(t){let{t:e,draft:n}=t;return(0,v.jsxs)("div",{className:"dg-field",children:[(0,v.jsx)(oe,{label:t.label,hint:n.clear?e("secretClearPending"):t.hasSaved?e("secretKeep"):void 0,children:t.multiline?(0,v.jsx)(Ye,{"aria-label":t.label,value:n.value,onChange:a=>t.onChange(a.target.value),rows:5,autoComplete:"off",spellCheck:!1,disabled:t.disabled}):(0,v.jsx)(se,{"aria-label":t.label,type:"password",value:n.value,onChange:a=>t.onChange(a.target.value),autoComplete:"new-password",disabled:t.disabled})}),(0,v.jsx)("div",{children:(0,v.jsx)(K,{size:"sm",variant:"ghost",disabled:t.disabled,onClick:()=>t.onClear(!n.clear),children:n.clear?e("secretUndoClear"):e("secretClear")})})]})}function _t(t){let{t:e,engines:n}=t,a=t.initial,[l,i]=(0,Ie.useState)(a?.engine??"sqlite"),[g,u]=(0,Ie.useState)(()=>({name:a?.name??"",group:a?.group??"",host:a?.host||"127.0.0.1",port:a?.port?String(a.port):"",user:a?.user??"",database:a?.database??"",file:a?.file??"",redisDb:String(a?.redisDb??0),sslMode:a?.sslMode??"disable",tlsServerName:a?.tlsServerName??"",color:a?.color??"none"})),[m,h]=(0,Ie.useState)(()=>({enabled:a?.ssh?.enabled===!0,host:a?.ssh?.host??"",port:String(a?.ssh?.port??22),username:a?.ssh?.username??"",authType:a?.ssh?.authType??"password",hostFingerprint:a?.ssh?.hostFingerprint??""})),[S,q]=(0,Ie.useState)(()=>({password:{value:"",clear:!1},sshPassword:{value:"",clear:!1},privateKey:{value:"",clear:!1},passphrase:{value:"",clear:!1}})),[W,w]=(0,Ie.useState)(null),[H,M]=(0,Ie.useState)(!1),[A,L]=(0,Ie.useState)(!1),[E,B]=(0,Ie.useState)(""),U=n.find(y=>y.id===l),Q=l!=="sqlite"&&U?.kind!=="file",ee=H||A,F=y=>D=>u(ge=>({...ge,[y]:D.target.value})),te=y=>D=>h(ge=>({...ge,[y]:D.target.value})),le=(y,D)=>q(ge=>({...ge,[y]:{value:D,clear:!1}})),z=(y,D)=>q(ge=>({...ge,[y]:{value:"",clear:D}})),I=(y,D)=>({t:e,draft:S[y],hasSaved:D,disabled:ee,onChange:ge=>le(y,ge),onClear:ge=>z(y,ge)}),Y=y=>{h(D=>({...D,authType:y})),q(D=>y==="password"?{...D,privateKey:{value:"",clear:!0},passphrase:{value:"",clear:!0}}:{...D,sshPassword:{value:"",clear:!0}})},R=()=>{let y="";return Q&&l==="sqlserver"&&g.sslMode==="verify-ca"?y=e("sqlserverVerifyCaUnsupported"):Q&&m.enabled&&(!m.host.trim()||!m.username.trim()||!["password","privateKey"].includes(m.authType)?y=e("sshFieldsRequired"):!/^\d+$/.test(m.port)||Number(m.port)<1||Number(m.port)>65535?y=e("sshPortInvalid"):/^SHA256:[A-Za-z0-9+/]{43}=?$/.test(m.hostFingerprint.trim())||(y=e("sshFingerprintInvalid"))),B(y),y&&w(null),!y},V=()=>{let y={name:g.name.trim(),engine:l,group:g.group.trim(),host:g.host.trim(),port:Number.parseInt(g.port,10)||U?.defaultPort||0,user:g.user.trim(),database:g.database.trim(),file:g.file.trim(),redisDb:Number.parseInt(g.redisDb,10)||0,sslMode:g.sslMode,color:g.color};if(Q)if(y.tlsServerName=g.tlsServerName.trim(),(S.password.value!==""||S.password.clear)&&(y.password=S.password.value),m.enabled){let D={enabled:!0,host:m.host.trim(),port:Number(m.port),username:m.username.trim(),authType:m.authType,hostFingerprint:m.hostFingerprint.trim()};m.authType==="password"?((S.sshPassword.value!==""||S.sshPassword.clear)&&(D.password=S.sshPassword.value),S.privateKey.clear&&(D.privateKey=""),S.passphrase.clear&&(D.passphrase="")):((S.privateKey.value!==""||S.privateKey.clear)&&(D.privateKey=S.privateKey.value),(S.passphrase.value!==""||S.passphrase.clear)&&(D.passphrase=S.passphrase.value),S.sshPassword.clear&&(D.password="")),y.ssh=D}else y.ssh={enabled:!1};else y.ssh={enabled:!1};return y},G=async()=>{if(R()){M(!0),w(null),B("");try{let y=await _.testDraft(V(),a?.id);w({ok:!0,text:he(e("testOk"),{version:y.serverVersion??"",ms:y.latencyMs??0})})}catch(y){w({ok:!1,text:he(e("testFailed"),{error:y instanceof Error?y.message:String(y)})})}finally{M(!1)}}},de=async()=>{if(R()){L(!0),B("");try{await t.onSave(V())}catch(y){B(y instanceof Error?y.message:String(y)),L(!1)}}},me=U?.kind==="file"?g.file.trim():`${g.host||"\u2026"}:${g.port||U?.defaultPort||"\u2026"}`;return(0,v.jsxs)(Se,{icon:"database",title:e(a?"edit":"newConnection"),onClose:t.onClose,busy:ee,width:620,footer:(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("span",{className:"dg-muted dg-hint",style:{marginRight:"auto",maxWidth:"54%"},children:W?.text??""}),(0,v.jsxs)(K,{onClick:()=>{G()},disabled:ee,children:[H?(0,v.jsx)(xe,{}):null,e("test")]}),(0,v.jsx)(K,{onClick:t.onClose,disabled:ee,children:e("cancel")}),(0,v.jsxs)(K,{variant:"primary",onClick:()=>{de()},disabled:ee,children:[A?(0,v.jsx)(xe,{}):null,e("save")]})]}),children:[(0,v.jsx)("div",{className:"dg-engines",children:n.map(y=>(0,v.jsxs)("button",{type:"button",className:`dg-engine${y.id===l?" dg-engine-active":""}`,onClick:()=>{y.id!==l&&(i(y.id),u(D=>({...D,port:String(y.defaultPort||""),sslMode:"disable"})),w(null))},children:[(0,v.jsxs)("span",{className:"dg-engine-head",children:[(0,v.jsx)(Ln,{engine:y.id,size:24}),(0,v.jsx)("span",{className:"dg-engine-name",children:y.label})]}),(0,v.jsx)("span",{className:"dg-tags",children:(Dn[y.id]??[]).map(D=>(0,v.jsx)("span",{className:"dg-tag",children:D},D))})]},y.id))}),(0,v.jsxs)("div",{className:"dg-tags dg-summary",children:[(0,v.jsx)("span",{className:"dg-tag dg-tag-strong",children:U?.label??l}),me?(0,v.jsx)("span",{className:"dg-tag",children:me}):null,g.database?(0,v.jsx)("span",{className:"dg-tag",children:g.database}):null,g.group?(0,v.jsx)("span",{className:"dg-tag",children:g.group}):null,Q&&g.sslMode!=="disable"?(0,v.jsx)("span",{className:"dg-tag",children:"TLS"}):null,Q&&m.enabled?(0,v.jsx)("span",{className:"dg-tag",children:"SSH"}):null]}),(0,v.jsxs)("section",{className:"dg-form-section",children:[(0,v.jsx)("div",{className:"dg-section-title",children:e("identity")}),(0,v.jsxs)("div",{className:"dg-form",children:[(0,v.jsx)(oe,{label:e("name"),children:(0,v.jsx)(se,{value:g.name,onChange:F("name"),placeholder:U?.label})}),(0,v.jsx)(oe,{label:e("group"),children:(0,v.jsx)(se,{value:g.group,onChange:F("group"),placeholder:"dev"})})]}),(0,v.jsxs)("div",{className:"dg-colors",children:[(0,v.jsx)("span",{className:"dg-field-label",children:e("color")}),qn.map(y=>(0,v.jsx)("button",{type:"button",className:`dg-swatch${y.value==="none"?" dg-swatch-none":""}${g.color===y.value?" dg-swatch-on":""}`,style:{background:y.color},title:y.value,"aria-label":y.value,"aria-pressed":g.color===y.value,onClick:()=>u(D=>({...D,color:y.value})),children:g.color===y.value?(0,v.jsx)(T,{name:"check",size:10}):null},y.value))]})]}),(0,v.jsxs)("section",{className:"dg-form-section",children:[U?.kind==="file"?null:(0,v.jsx)("div",{className:"dg-section-title",children:e("server")}),U?.kind==="file"?(0,v.jsx)("div",{className:"dg-form",children:(0,v.jsx)(oe,{label:e("file"),wide:!0,hint:"e.g. D:\\\\data\\\\app.db",children:(0,v.jsx)(se,{value:g.file,onChange:F("file"),placeholder:"C:/data/app.db"})})}):(0,v.jsxs)("div",{className:"dg-form",children:[(0,v.jsx)(oe,{label:e("host"),hint:m.enabled?e("sshDatabaseHostHint"):void 0,children:(0,v.jsx)(se,{value:g.host,onChange:F("host")})}),(0,v.jsx)(oe,{label:e("port"),children:(0,v.jsx)(se,{value:g.port,onChange:F("port"),placeholder:String(U?.defaultPort??"")})}),(0,v.jsx)(oe,{label:e("user"),children:(0,v.jsx)(se,{value:g.user,onChange:F("user")})}),(0,v.jsx)(Ze,{label:e("password"),...I("password",a?.hasPassword??!1)}),l==="redis"?(0,v.jsx)(oe,{label:e("redisDb"),children:(0,v.jsx)(se,{value:g.redisDb,onChange:F("redisDb"),inputMode:"numeric"})}):(0,v.jsx)(oe,{label:e("database"),children:(0,v.jsx)(se,{value:g.database,onChange:F("database"),placeholder:"optional"})}),(0,v.jsx)(oe,{label:"TLS / SSL",hint:l==="sqlserver"?e("sqlserverVerifyCaUnsupported"):void 0,children:(0,v.jsxs)(we,{value:g.sslMode,onChange:y=>u(D=>({...D,sslMode:y.target.value})),children:[(0,v.jsx)("option",{value:"disable",children:e("sslDisable")}),(0,v.jsx)("option",{value:"require",children:e("sslRequire")}),(0,v.jsx)("option",{value:"verify-ca",disabled:l==="sqlserver",children:e("sslVerifyCa")}),(0,v.jsx)("option",{value:"verify-full",children:e("sslVerifyFull")})]})}),g.sslMode!=="disable"?(0,v.jsx)(oe,{label:e("tlsServerName"),hint:e("tlsServerNameHint"),children:(0,v.jsx)(se,{value:g.tlsServerName,onChange:F("tlsServerName"),placeholder:g.host.trim()})}):null]})]}),Q?(0,v.jsxs)("section",{className:"dg-form-section",children:[(0,v.jsx)("div",{className:"dg-section-title",children:e("sshSection")}),(0,v.jsxs)("label",{className:"dg-field-label",style:{display:"flex",alignItems:"center",gap:8},children:[(0,v.jsx)("input",{type:"checkbox",checked:m.enabled,disabled:ee,onChange:y=>{h(D=>({...D,enabled:y.target.checked})),w(null)}}),e("sshEnable")]}),m.enabled?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)("div",{className:"dg-field-hint",children:e("sshSingleHopHint")}),(0,v.jsxs)("div",{className:"dg-form",children:[(0,v.jsx)(oe,{label:e("sshHost"),children:(0,v.jsx)(se,{value:m.host,onChange:te("host"),required:!0,disabled:ee,autoComplete:"off"})}),(0,v.jsx)(oe,{label:e("sshPort"),children:(0,v.jsx)(se,{value:m.port,onChange:te("port"),required:!0,inputMode:"numeric",disabled:ee})}),(0,v.jsx)(oe,{label:e("sshUsername"),children:(0,v.jsx)(se,{value:m.username,onChange:te("username"),required:!0,disabled:ee,autoComplete:"off"})}),(0,v.jsx)(oe,{label:e("sshAuthType"),children:(0,v.jsxs)(we,{value:m.authType,disabled:ee,required:!0,onChange:y=>Y(y.target.value),children:[(0,v.jsx)("option",{value:"password",children:e("sshAuthPassword")}),(0,v.jsx)("option",{value:"privateKey",children:e("sshAuthPrivateKey")})]})}),(0,v.jsx)(oe,{label:e("sshHostFingerprint"),wide:!0,hint:e("sshFingerprintHint"),children:(0,v.jsx)(se,{value:m.hostFingerprint,onChange:te("hostFingerprint"),placeholder:"SHA256:\u2026",required:!0,disabled:ee,autoComplete:"off",spellCheck:!1})}),m.authType==="password"?(0,v.jsx)(Ze,{label:e("sshPassword"),...I("sshPassword",a?.ssh?.hasPassword??!1)}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsxs)("div",{className:"dg-field-wide",children:[(0,v.jsx)(Ze,{label:e("sshPrivateKey"),multiline:!0,...I("privateKey",a?.ssh?.hasPrivateKey??!1)}),(0,v.jsx)("div",{className:"dg-field-hint",children:e("sshPrivateKeyHint")})]}),(0,v.jsx)(Ze,{label:e("sshPassphrase"),...I("passphrase",a?.ssh?.hasPassphrase??!1)})]})]}),(0,v.jsx)(ue,{children:e("sshSecurityHint")})]}):a?.ssh?(0,v.jsx)("div",{className:"dg-field-hint",children:e("sshDisableHint")}):null]}):null,E?(0,v.jsx)(ue,{tone:"error",onClose:()=>B(""),children:E}):null]})}var et=require("react");var Z=require("react/jsx-runtime");function Gt(t){let{t:e,store:n}=t,a=be(n.meta),l=be(n.connections),[i,g]=(0,et.useState)({}),[u,m]=(0,et.useState)(""),[h,S]=(0,et.useState)(""),q=a.meta?.workspaces??[],W=a.meta?.bindings??[],w=E=>W.find(B=>B.workspaceId===E),H=E=>{let B=w(E);return i[E]??{connectionId:B?.connectionId??"",database:B?.database??""}},M=(E,B)=>g(U=>({...U,[E]:{...H(E),...B}})),A=async(E,B)=>{let U=H(E);if(!U.connectionId)return S(e("selectConnection"));m(E),S("");try{await _.bindProject({workspaceId:E,workspacePath:B,connectionId:U.connectionId,database:U.database}),await n.meta.load();let ee=l.items.find(z=>z.id===U.connectionId)?.name||U.connectionId,F=U.database?` (${U.database})`:"",le=e("projectBound").replace("{name}",ee).replace("\uFF08{database}\uFF09",F).replace("({database})",F).replace("{database}",U.database||"");t.notify(le,"success")}catch(Q){S(Q instanceof Error?Q.message:String(Q))}finally{m("")}},L=async E=>{m(E);try{await _.unbindProject(E),await n.meta.load(),t.notify(e("unbindProject")+" \u2713","info")}catch(B){S(B instanceof Error?B.message:String(B))}finally{m("")}};return(0,Z.jsxs)(Se,{icon:"link",title:e("workspaces"),subtitle:e("agentHint"),onClose:t.onClose,width:680,footer:(0,Z.jsx)(K,{onClick:t.onClose,children:e("close")}),children:[h?(0,Z.jsx)(ue,{tone:"error",onClose:()=>S(""),children:h}):null,q.length===0?(0,Z.jsx)(ye,{title:e("noWorkspaces")}):(0,Z.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:12,maxHeight:"60vh",overflow:"auto",padding:"2px 0"},children:q.map(E=>{let B=w(E.id),U=H(E.id),Q=l.items.find(F=>F.id===U.connectionId),ee=U.connectionId?n.connections.session(U.connectionId).databases:[];return(0,Z.jsxs)("div",{className:"dg-ws-row",children:[(0,Z.jsxs)("div",{className:"dg-ws-head",children:[(0,Z.jsx)("span",{className:"dg-ws-icon",children:(0,Z.jsx)(T,{name:"folder",size:14})}),(0,Z.jsxs)("div",{className:"dg-truncate",style:{flex:1,minWidth:0},children:[(0,Z.jsx)("div",{className:"dg-ws-title",children:E.title}),(0,Z.jsx)("div",{className:"dg-ws-path",title:E.path,children:E.path})]}),B?(0,Z.jsxs)("span",{className:"dg-status-badge dg-status-badge-ok",children:[(0,Z.jsx)("span",{className:"dg-dot dg-dot-open"}),e("boundProject")]}):(0,Z.jsx)("span",{className:"dg-status-badge",children:e("projectUnbound")})]}),B?(0,Z.jsxs)("div",{className:"dg-tags",style:{marginTop:2,marginBottom:4},children:[(0,Z.jsxs)("span",{className:"dg-tag dg-tag-strong",children:[(0,Z.jsx)(T,{name:"database",size:10}),B.connectionName||B.connectionId]}),B.database?(0,Z.jsx)("span",{className:"dg-tag",children:B.database}):null,(0,Z.jsx)("span",{className:"dg-tag dg-tag-accent",children:e("readOnlyForAgent")})]}):null,(0,Z.jsxs)("div",{className:"dg-ws-form",children:[(0,Z.jsx)(oe,{label:e("connections"),children:(0,Z.jsxs)(we,{value:U.connectionId,onChange:F=>{let te=F.target.value,le=l.items.find(z=>z.id===te);M(E.id,{connectionId:te,database:le?.database||""})},children:[(0,Z.jsx)("option",{value:"",children:"\u2014"}),l.items.map(F=>(0,Z.jsxs)("option",{value:F.id,children:[F.name," \xB7 ",F.engine]},F.id))]})}),(0,Z.jsx)(oe,{label:e("database"),children:ee.length>0?(0,Z.jsxs)(we,{value:U.database,onChange:F=>M(E.id,{database:F.target.value}),children:[(0,Z.jsx)("option",{value:"",children:Q?.database?`${Q.database} (default)`:"\u2014"}),ee.map(F=>(0,Z.jsx)("option",{value:F.name,children:F.name},F.name))]}):(0,Z.jsx)(se,{value:U.database,placeholder:Q?.database||"optional",onChange:F=>M(E.id,{database:F.target.value})})}),(0,Z.jsxs)("div",{className:"dg-ws-actions",children:[(0,Z.jsxs)(K,{size:"sm",variant:"primary",disabled:u===E.id||!U.connectionId,onClick:()=>{A(E.id,E.path)},children:[(0,Z.jsx)(T,{name:"link",size:11}),e("bindProject")]}),B?(0,Z.jsx)(K,{size:"sm",variant:"ghost",disabled:u===E.id,onClick:()=>{L(E.id)},children:e("unbindProject")}):null]})]})]},E.id)})})]})}var ke=require("react");var o=require("react/jsx-runtime");function Yt(t){let{t:e,store:n}=t,a=be(n.catalog),l=`${t.connectionId}|${t.database}|${t.schema}`,[i,g]=(0,ke.useState)(""),[u,m]=(0,ke.useState)({column:"name",dir:"asc"});(0,ke.useEffect)(()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let h=(0,ke.useMemo)(()=>{let w=i.trim().toLowerCase();return(a.relations[l]??[]).filter(M=>M.kind===t.kind).filter(M=>w?M.name.toLowerCase().includes(w):!0).sort((M,A)=>{let L=u.dir==="desc"?-1:1;return u.column==="rows"?((M.rows??0)-(A.rows??0))*L:u.column==="comment"?(M.comment||"").localeCompare(A.comment||"")*L:M.name.localeCompare(A.name)*L})},[a.relations,l,i,t.kind,u]),S=a.loading[l]===!0,q=a.errors[l]??"",W=(w,H,M)=>(0,o.jsxs)("th",{className:M,onClick:()=>m(A=>A.column===w?{column:w,dir:A.dir==="asc"?"desc":"asc"}:{column:w,dir:"asc"}),children:[H,u.column===w?(0,o.jsx)("span",{className:"dg-sortmark",children:u.dir==="desc"?"\u25BC":"\u25B2"}):null]});return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(T,{name:t.kind==="view"?"view":"table",size:12}),(0,o.jsx)("span",{children:t.kind==="view"?e("views"):e("tables")}),(0,o.jsx)("span",{className:"dg-chip",children:h.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(se,{value:i,placeholder:e("search"),style:{width:180},onChange:w=>g(w.target.value)}),t.onNewQuery?(0,o.jsxs)(K,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,o.jsx)(T,{name:"play",size:10}),e("newQuery")]}):null,(0,o.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRelations(t.connectionId,t.database,t.schema,!0)}})]}),q?(0,o.jsx)(ue,{tone:"error",children:q}):null,(0,o.jsx)("div",{className:"dg-grid-wrap",children:S?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):h.length===0?(0,o.jsx)(ye,{title:e("emptyTables")}):(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[W("name",e("name")),W("rows",e("rows"),"dg-num"),W("comment",e("comment")),(0,o.jsx)("th",{style:{width:70}})]})}),(0,o.jsx)("tbody",{children:h.map(w=>(0,o.jsxs)("tr",{onDoubleClick:()=>t.onOpen(w),children:[(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-list-name",children:[(0,o.jsx)(T,{name:w.kind==="view"?"view":"table",size:11}),(0,o.jsx)("span",{className:"dg-mono",children:w.name})]})}),(0,o.jsx)("td",{className:"dg-num",children:w.rows??"\u2014"}),(0,o.jsx)("td",{className:"dg-muted dg-truncate",title:w.comment,children:w.comment}),(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,o.jsx)(ce,{icon:"play",title:e("openInQuery"),size:11,onClick:()=>t.onQuery(w)}),(0,o.jsx)(ce,{icon:"table",title:e("data"),size:11,onClick:()=>t.onOpen(w)})]})})]},w.name))})]})})]})}function Zt(t){let{t:e,store:n}=t,a=be(n.connections),l=be(n.catalog),i=a.items.find(w=>w.id===t.connectionId),g=`${t.connectionId}|${t.database.name}|${t.schemas[0]??""}`,u=l.relations[g]??[],m=a.sessions[t.connectionId],h=i?i.engine!=="redis":!1;(0,ke.useEffect)(()=>{for(let w of t.schemas.length?t.schemas:[""])n.catalog.loadRelations(t.connectionId,t.database.name,w)},[t.connectionId,t.database.name,t.schemas,n]);let S=u.filter(w=>w.kind==="table").length,q=u.filter(w=>w.kind==="view").length,W=n.bindings().find(w=>w.connectionId===t.connectionId)??null;return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(T,{name:"database",size:12}),(0,o.jsx)("span",{className:"dg-mono",children:t.database.name}),(0,o.jsx)("span",{className:"dg-chip",children:i?.engine??""}),m?.version?(0,o.jsx)("span",{className:"dg-chip",children:m.version}):null,(0,o.jsx)("div",{className:"dg-spacer"}),h&&t.onNewQuery?(0,o.jsxs)(K,{size:"sm",variant:"tonal",onClick:t.onNewQuery,title:e("newQuery"),children:[(0,o.jsx)(T,{name:"play",size:10}),e("newQuery")]}):null]}),(0,o.jsxs)("div",{style:{overflow:"auto"},children:[(0,o.jsxs)("div",{className:"dg-cards",children:[(0,o.jsxs)("div",{className:"dg-card",onClick:()=>t.onOpenRelations("table"),style:{cursor:"pointer"},children:[(0,o.jsx)("div",{className:"dg-card-value",children:S}),(0,o.jsx)("div",{className:"dg-card-label",children:e("tables")})]}),(0,o.jsxs)("div",{className:"dg-card",onClick:()=>t.onOpenRelations("view"),style:{cursor:"pointer"},children:[(0,o.jsx)("div",{className:"dg-card-value",children:q}),(0,o.jsx)("div",{className:"dg-card-label",children:e("views")})]}),(0,o.jsxs)("div",{className:"dg-card",children:[(0,o.jsx)("div",{className:"dg-card-value",children:t.schemas.length||1}),(0,o.jsx)("div",{className:"dg-card-label",children:e("schema")})]}),(0,o.jsxs)("div",{className:"dg-card",children:[(0,o.jsx)("div",{className:"dg-card-value",children:t.database.file?Bt(t.database.file.length):"\u2014"}),(0,o.jsx)("div",{className:"dg-card-label",children:e("file")})]})]}),(0,o.jsxs)("div",{className:"dg-section",children:[(0,o.jsx)("div",{className:"dg-section-title",children:e("agentHint")}),W&&W.connectionId===t.connectionId?(0,o.jsx)(ue,{tone:"success",children:e("projectBound").replace("{name}",W.connectionName??W.connectionId).replace("{database}",W.database)}):(0,o.jsx)(ue,{children:e("projectUnbound")}),(0,o.jsx)(ue,{children:n.meta.allowWrites?e("writesEnabled"):e("readOnlyForAgent")})]}),(0,o.jsxs)("div",{className:"dg-section",children:[(0,o.jsx)("div",{className:"dg-section-title",children:e("schema")}),t.schemas.length>0?t.schemas.map(w=>(0,o.jsxs)("div",{className:"dg-row",children:[(0,o.jsx)(T,{name:"folder",size:11}),(0,o.jsx)("span",{className:"dg-mono",children:w})]},w)):(0,o.jsx)("div",{className:"dg-muted",children:"default"})]})]})]})}function en(t){let{t:e,store:n}=t,a=be(n.catalog),l=`${t.connectionId}|${t.database}|${t.schema}`,i=a.routines[l]??[],[g,u]=(0,ke.useState)("");(0,ke.useEffect)(()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema)},[t.connectionId,t.database,t.schema,n]);let m=i.find(h=>h.name===g)??null;return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(T,{name:"function",size:12}),(0,o.jsx)("span",{children:e("functions")}),(0,o.jsx)("span",{className:"dg-chip",children:i.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadRoutines(t.connectionId,t.database,t.schema,!0)}})]}),(0,o.jsxs)("div",{className:"dg-struct",style:{flex:1},children:[(0,o.jsx)("div",{className:"dg-struct-col",style:{flex:"0 0 46%"},children:(0,o.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:a.loading[l]?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):i.length===0?(0,o.jsx)(ye,{title:e("noRoutines")}):(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:e("name")}),(0,o.jsx)("th",{children:e("type")}),(0,o.jsx)("th",{children:e("returnType")})]})}),(0,o.jsx)("tbody",{children:i.map(h=>(0,o.jsxs)("tr",{className:h.name===g?"dg-row-active":"",onClick:()=>u(h.name),children:[(0,o.jsx)("td",{className:"dg-mono",children:h.name}),(0,o.jsx)("td",{children:h.kind==="function"?e("functionKind"):e("procedureKind")}),(0,o.jsx)("td",{className:"dg-muted dg-truncate",children:h.returnType||"\u2014"})]},`${h.kind}-${h.name}`))})]})})}),(0,o.jsxs)("div",{className:"dg-struct-col",children:[(0,o.jsx)("div",{className:"dg-struct-head",children:e("definition")}),(0,o.jsx)("div",{className:"dg-struct-body",children:m?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"dg-row",style:{marginBottom:6},children:[(0,o.jsx)("span",{className:"dg-mono",children:m.name}),(0,o.jsx)("span",{className:"dg-tag",children:m.language||m.kind})]}),(0,o.jsx)("pre",{className:"dg-pre",children:m.definition||"\u2014"})]}):(0,o.jsx)("div",{className:"dg-muted",children:e("selectConnection")})})]})]})]})}function tn(t){let{t:e,store:n}=t,a=be(n.catalog),l=a.accounts[t.connectionId]??[];return(0,ke.useEffect)(()=>{n.catalog.loadAccounts(t.connectionId)},[t.connectionId,n]),(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(T,{name:"user",size:12}),(0,o.jsx)("span",{children:e("users")}),(0,o.jsx)("span",{className:"dg-chip",children:l.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.catalog.loadAccounts(t.connectionId,!0)}})]}),(0,o.jsx)("div",{className:"dg-grid-wrap",children:a.loading[t.connectionId]?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):l.length===0?(0,o.jsx)(ye,{title:e("noAccounts")}):(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:e("accountName")}),(0,o.jsx)("th",{children:e("accountHost")}),(0,o.jsx)("th",{children:e("accountPlugin")}),(0,o.jsx)("th",{children:e("accountPrivileged")}),(0,o.jsx)("th",{children:e("accountLocked")})]})}),(0,o.jsx)("tbody",{children:l.map(i=>(0,o.jsxs)("tr",{children:[(0,o.jsx)("td",{className:"dg-mono",children:i.name}),(0,o.jsx)("td",{className:"dg-mono dg-muted",children:i.host}),(0,o.jsx)("td",{className:"dg-muted",children:i.plugin}),(0,o.jsx)("td",{children:i.privileged?"\u2713":""}),(0,o.jsx)("td",{children:i.locked?"\u2713":""})]},`${i.name}@${i.host}`))})]})})]})}function nn(t){let{t:e,store:n}=t,a=be(n.queries),l=be(n.connections),[i,g]=(0,ke.useState)("");(0,ke.useEffect)(()=>{a.items.length===0&&n.queries.load()},[a.items.length,n]);let u=i.trim().toLowerCase(),m=(0,ke.useMemo)(()=>{let h=new Map;for(let S of a.items){if(u&&!S.name.toLowerCase().includes(u)&&!S.sql.toLowerCase().includes(u))continue;let q=l.items.find(A=>A.id===S.connectionId),W=q?.name||S.connectionId||e("connections"),w=S.database||"default",H=`${W} / ${w}`,M=h.get(H)??{key:H,connectionId:S.connectionId,connectionName:W,engine:q?.engine,database:w,items:[]};M.items.push(S),h.set(H,M)}return[...h.values()].sort((S,q)=>S.key.localeCompare(q.key))},[a.items,l.items,u,e]);return(0,o.jsxs)("div",{className:"dg-content",children:[(0,o.jsxs)("div",{className:"dg-subbar",children:[(0,o.jsx)(T,{name:"bookmark",size:12}),(0,o.jsx)("span",{children:e("queries")}),(0,o.jsx)("span",{className:"dg-chip",children:a.items.length}),(0,o.jsx)("div",{className:"dg-spacer"}),(0,o.jsx)(se,{value:i,placeholder:e("search"),style:{width:180},onChange:h=>g(h.target.value)}),(0,o.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.queries.load()}})]}),a.error?(0,o.jsx)(ue,{tone:"error",children:a.error}):null,(0,o.jsx)("div",{className:"dg-grid-wrap",children:a.loading&&a.items.length===0?(0,o.jsx)("div",{className:"dg-sqlmsg",children:(0,o.jsx)(xe,{label:e("loading")})}):m.length===0?(0,o.jsx)(ye,{title:e("noQueries")}):(0,o.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:14,padding:"12px 16px"},children:m.map(h=>(0,o.jsxs)("div",{className:"dg-query-category",children:[(0,o.jsxs)("div",{className:"dg-query-category-head",children:[(0,o.jsx)("span",{className:"dg-query-category-icon",children:(0,o.jsx)(T,{name:"database",size:12})}),(0,o.jsx)("span",{className:"dg-query-category-title",children:h.connectionName}),h.engine?(0,o.jsx)("span",{className:"dg-badge",children:h.engine}):null,(0,o.jsx)("span",{className:"dg-query-category-sep",children:"/"}),(0,o.jsx)("span",{className:"dg-query-category-db",children:h.database}),(0,o.jsx)("span",{className:"dg-badge",style:{marginLeft:"auto"},children:h.items.length})]}),(0,o.jsxs)("table",{className:"dg-list",children:[(0,o.jsx)("thead",{children:(0,o.jsxs)("tr",{children:[(0,o.jsx)("th",{children:e("queryName")}),(0,o.jsx)("th",{children:e("source")}),(0,o.jsx)("th",{children:e("updatedAt")}),(0,o.jsx)("th",{style:{width:96}})]})}),(0,o.jsx)("tbody",{children:h.items.map(S=>(0,o.jsxs)("tr",{onDoubleClick:()=>t.onOpen(S),children:[(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-list-name",children:[(0,o.jsx)(T,{name:"bookmark",size:11}),(0,o.jsx)("span",{style:{fontWeight:500},children:S.name})]})}),(0,o.jsx)("td",{children:(0,o.jsx)("span",{className:"dg-tag",children:S.scope})}),(0,o.jsx)("td",{className:"dg-muted",children:Ft(S.updatedAt)}),(0,o.jsx)("td",{children:(0,o.jsxs)("span",{className:"dg-row",style:{gap:2},children:[(0,o.jsx)(ce,{icon:"play",title:e("openInEditor"),size:11,onClick:()=>t.onOpen(S)}),(0,o.jsx)(ce,{icon:"trash",title:e("delete"),size:11,onClick:()=>{n.queries.remove(S.id).catch(q=>t.notify(String(q),"error"))}})]})})]},S.id))})]})]},h.key))})})]})}var pe=require("react");var x=require("react/jsx-runtime");function an(t){let{t:e,tab:n}=t,[a,l]=(0,pe.useState)([]),[i,g]=(0,pe.useState)(Number(n.database.replace(/[^0-9]/g,""))||0),[u,m]=(0,pe.useState)("*"),[h,S]=(0,pe.useState)(""),[q,W]=(0,pe.useState)([]),[w,H]=(0,pe.useState)("0"),[M,A]=(0,pe.useState)(""),[L,E]=(0,pe.useState)(null),[B,U]=(0,pe.useState)(""),[Q,ee]=(0,pe.useState)(null),[F,te]=(0,pe.useState)(""),[le,z]=(0,pe.useState)(!1),[I,Y]=(0,pe.useState)(()=>new Set),[R,V]=(0,pe.useState)(null),[G,de]=(0,pe.useState)("");(0,pe.useEffect)(()=>{_.redisDatabases(n.connectionId).then(r=>l(r.databases)).catch(()=>{})},[n.connectionId]);let me=async r=>{try{let p=await _.redisScan({connectionId:n.connectionId,cursor:r?"0":w,pattern:u,type:h,database:i});W(N=>{let X=r?[]:N.slice(),ae=new Set(X.map(fe=>fe.key));for(let fe of p.keys)ae.has(fe.key)||X.push(fe);return X.sort((fe,Pe)=>fe.key.localeCompare(Pe.key))}),H(p.cursor),te("")}catch(p){te(p instanceof Error?p.message:String(p))}};(0,pe.useEffect)(()=>{W([]),A(""),E(null),me(!0)},[n.connectionId,i]);let y=async r=>{A(r);try{E(await _.redisKey(n.connectionId,r,i)),te("")}catch(p){E(null),te(p instanceof Error?p.message:String(p))}},D=async r=>{z(!0);try{let p=await _.redisCommand(n.connectionId,r);ee(p.reply),await me(!0),M&&await y(M),te("")}catch(p){te(p instanceof Error?p.message:String(p))}finally{z(!1)}},ge=(0,pe.useMemo)(()=>{let r=new Map;for(let p of q){let N=p.key.indexOf(":"),X=N>0?p.key.slice(0,N):"",ae=r.get(X)??[];ae.push(p),r.set(X,ae)}return[...r.entries()].sort((p,N)=>p[0]===""?1:N[0]===""?-1:p[0].localeCompare(N[0]))},[q]),s=()=>L?L.value===null||L.value===void 0?(0,x.jsx)(ye,{title:e("null")}):L.type==="string"?(0,x.jsx)("pre",{className:"dg-pre",style:{padding:9},children:String(L.value)}):L.type==="hash"?(0,x.jsx)("div",{className:"dg-grid-wrap",children:(0,x.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,x.jsx)("tbody",{children:Object.entries(L.value).map(([r,p])=>(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{className:"dg-mono",style:{width:"32%"},children:r}),(0,x.jsx)("td",{children:String(p)})]},r))})})}):Array.isArray(L.value)?(0,x.jsx)("div",{className:"dg-grid-wrap",children:(0,x.jsx)("table",{className:"dg-grid",style:{width:"100%"},children:(0,x.jsx)("tbody",{children:L.value.map((r,p)=>(0,x.jsxs)("tr",{children:[(0,x.jsx)("td",{className:"dg-rownum",children:p}),(0,x.jsx)("td",{className:"dg-mono",children:typeof r=="object"?JSON.stringify(r):String(r)})]},p))})})}):(0,x.jsx)("pre",{className:"dg-pre",style:{padding:9},children:JSON.stringify(L.value,null,2)}):(0,x.jsx)(ye,{title:e("keyValue")});return(0,x.jsxs)("div",{className:"dg-redis",children:[(0,x.jsxs)("div",{className:"dg-redis-list",children:[(0,x.jsxs)("div",{className:"dg-panehead",children:[(0,x.jsx)(T,{name:"database",size:11}),e("redisKeys"),(0,x.jsx)("div",{className:"dg-spacer"}),(0,x.jsx)(we,{value:String(i),onChange:r=>g(Number(r.target.value)),children:(a.length?a:[{name:"db0",schemas:[]}]).map(r=>(0,x.jsx)("option",{value:r.name.replace("db",""),children:r.name},r.name))}),(0,x.jsx)(ce,{icon:"plus",title:e("newKey"),size:11,onClick:()=>{V({kind:"new"}),de("")}}),(0,x.jsx)(ce,{icon:"refresh",title:e("refresh"),size:11,onClick:()=>{me(!0)}})]}),(0,x.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,x.jsxs)("div",{className:"dg-search",children:[(0,x.jsx)(T,{name:"search",size:10}),(0,x.jsx)("input",{value:u,placeholder:e("redisPattern"),onChange:r=>m(r.target.value),onKeyDown:r=>r.key==="Enter"&&void me(!0)})]}),(0,x.jsxs)(we,{value:h,onChange:r=>{S(r.target.value),me(!0)},children:[(0,x.jsx)("option",{value:"",children:"any"}),["string","hash","list","set","zset","stream"].map(r=>(0,x.jsx)("option",{value:r,children:r},r))]})]}),(0,x.jsx)("div",{className:"dg-redis-keys",children:q.length===0?(0,x.jsx)("div",{className:"dg-muted",style:{padding:7},children:e("emptyObjects")}):ge.map(([r,p])=>{let N=r===""||!I.has(r);return(0,x.jsxs)("div",{children:[r?(0,x.jsxs)("div",{className:"dg-rns",onClick:()=>Y(X=>{let ae=new Set(X);return ae.has(r)?ae.delete(r):ae.add(r),ae}),children:[(0,x.jsx)("span",{className:`dg-twist${N?" dg-twist-open":""}`,children:(0,x.jsx)(T,{name:"chevron",size:8})}),(0,x.jsx)(T,{name:"folder",size:10}),(0,x.jsxs)("span",{className:"dg-truncate",style:{flex:1},children:[r,":"]}),(0,x.jsx)("span",{className:"dg-badge",children:p.length})]}):null,N?p.map(X=>(0,x.jsxs)("div",{className:`dg-rkey${X.key===M?" dg-rkey-active":""}`,onClick:()=>{y(X.key)},title:X.key,children:[(0,x.jsx)("span",{className:"dg-truncate",style:{flex:1},children:r?X.key.slice(r.length+1):X.key}),(0,x.jsx)("span",{className:"dg-badge",children:X.type})]},X.key)):null]},r||"_")})}),w!=="0"?(0,x.jsx)("div",{className:"dg-pager",children:(0,x.jsx)(K,{size:"sm",onClick:()=>{me(!1)},children:e("scanMore")})}):null]}),(0,x.jsxs)("div",{className:"dg-redis-detail",children:[F?(0,x.jsx)(ue,{tone:"error",onClose:()=>te(""),children:F}):null,L?(0,x.jsxs)("div",{className:"dg-subbar",children:[(0,x.jsx)("span",{className:"dg-mono dg-truncate",title:L.key,children:L.key}),(0,x.jsx)("span",{className:"dg-tag",children:L.type}),(0,x.jsxs)("span",{className:"dg-chip",children:[e("ttl"),": ",L.ttl>0?`${L.ttl}s`:e("noTtl")]}),(0,x.jsx)("div",{className:"dg-spacer"}),(0,x.jsx)(K,{size:"sm",onClick:()=>{V({kind:"rename"}),de(L.key)},children:e("rename")}),(0,x.jsx)(K,{size:"sm",onClick:()=>{V({kind:"ttl"}),de(L.ttl>0?String(L.ttl):"3600")},children:e("setTtl")}),(0,x.jsx)(K,{size:"sm",onClick:()=>{V({kind:"value"}),de(String(L.value??""))},children:e("editValue")}),(0,x.jsx)(K,{size:"sm",variant:"danger",onClick:()=>{(async()=>{await _.redisDelete(n.connectionId,L.key,L.database??i),A(""),E(null),await me(!0),t.notify(e("deleted"),"success")})()},children:e("deleteKey")})]}):null,(0,x.jsx)("div",{className:"dg-grid-wrap",children:s()}),(0,x.jsxs)("div",{className:"dg-redis-console",children:[(0,x.jsxs)("div",{className:"dg-row",children:[(0,x.jsx)(T,{name:"play",size:10}),(0,x.jsx)(se,{value:B,placeholder:e("commandHint"),style:{flex:1},onChange:r=>U(r.target.value),onKeyDown:r=>r.key==="Enter"&&B.trim()&&void D(B)}),(0,x.jsx)(K,{size:"sm",variant:"primary",disabled:le,onClick:()=>B.trim()&&void D(B),children:e("run")})]}),Q!==null?(0,x.jsx)("pre",{className:"dg-pre",style:{maxHeight:110,overflow:"auto"},children:JSON.stringify(Q,null,2)}):null]})]}),R?(0,x.jsx)(Se,{title:R.kind==="new"?e("newKey"):R.kind==="rename"?e("rename"):R.kind==="ttl"?e("setTtl"):e("editValue"),width:420,onClose:()=>V(null),footer:(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(K,{onClick:()=>V(null),children:e("cancel")}),(0,x.jsx)(K,{variant:"primary",onClick:()=>{(async()=>{let r=N=>N.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),p="";R.kind==="new"&&(p=`SET "${r(G)}" ""`),R.kind==="rename"&&L&&(p=`RENAME "${r(L.key)}" "${r(G)}"`),R.kind==="ttl"&&L&&(p=`EXPIRE "${r(L.key)}" ${Number.parseInt(G,10)||0}`),R.kind==="value"&&L&&(p=`SET "${r(L.key)}" "${r(G)}"`),p&&await D(p),V(null),t.notify(e("saved"),"success")})()},children:e("save")})]}),children:(0,x.jsx)(oe,{label:R.kind==="ttl"?e("ttl"):R.kind==="value"?e("keyValue"):e("name"),children:(0,x.jsx)(se,{value:G,autoFocus:!0,onChange:r=>de(r.target.value)})})}):null]})}var ve=require("react");var P=require("react/jsx-runtime");function sn(t){let{t:e,tab:n}=t,[a,l]=(0,ve.useState)(n.initialSql??""),[i,g]=(0,ve.useState)(null),[u,m]=(0,ve.useState)(0),[h,S]=(0,ve.useState)(!1),[q,W]=(0,ve.useState)(""),[w,H]=(0,ve.useState)(""),[M,A]=(0,ve.useState)(null),[L,E]=(0,ve.useState)(0),[B,U]=(0,ve.useState)(!1),[Q,ee]=(0,ve.useState)(""),F=(0,ve.useRef)(null),te=(0,ve.useRef)(null),le=(0,ve.useMemo)(()=>a.split(`
`).length,[a]),z=(0,ve.useMemo)(()=>mt(a),[a]),I=(0,ve.useMemo)(()=>{let s=[];for(let r of t.tables)s.push({label:r,kind:"table"});for(let r of pt)s.push({label:r,kind:"fn"});for(let r of ut)s.push({label:r,kind:"kw"});return s},[t.tables]);(0,ve.useEffect)(()=>{n.initialSql&&l(n.initialSql)},[n.id,n.initialSql]);let Y=s=>{let r=F.current;if(!r)return;let p=r.selectionStart,N=/([A-Za-z_][A-Za-z0-9_]*)$/.exec(a.slice(0,p))?.[1]??"";if(!N&&!s)return A(null);let X=N.toLowerCase(),ae=new Set,fe=I.filter(Fe=>{let Le=Fe.label.toLowerCase();return X&&!Le.startsWith(X)||ae.has(Le)?!1:(ae.add(Le),!0)}).slice(0,14);if(fe.length===0)return A(null);let Pe=qt(r,p-N.length);A({items:fe,index:0,left:Pe.left,top:Pe.top+18,start:p-N.length,end:p})},R=()=>{if(!M)return;let s=M.items[M.index];if(!s)return;let r=M.start+s.label.length;l(`${a.slice(0,M.start)}${s.label}${a.slice(M.end)}`),A(null),requestAnimationFrame(()=>{let p=F.current;p&&(p.focus(),p.selectionStart=p.selectionEnd=r)})},V=async s=>{let r=s.trim();if(!r)return t.notify(e("noStatements"),"info");S(!0),W("");try{let p=await _.sql({connectionId:n.connectionId,database:n.database,sql:r});g(p),m(0);let N=p.results.find(ae=>ae.error),X=p.results[0];H(N?he(e("queryFailed"),{ms:p.durationMs}):he(e("queryOk"),{n:X?.rowCount??0,ms:p.durationMs})),p.results.some(ae=>ae.truncated)&&W(e("resultTruncated")),N?.error&&W(N.error)}catch(p){W(p instanceof Error?p.message:String(p)),g(null),H("")}finally{S(!1)}},G=async()=>{try{let s=await _.sqlCancel(n.connectionId);t.notify(s.cancelled?e("queryCancelled"):s.reason||e("cancelUnsupported"),s.cancelled?"info":"error")}catch(s){t.notify(s instanceof Error?s.message:String(s),"error")}},de=()=>{let s=F.current;s&&s.selectionStart!==s.selectionEnd?V(a.slice(s.selectionStart,s.selectionEnd)):V(a)},me=()=>{let s=a.split(";").map(r=>r.trim()).filter(Boolean)[0];if(!s)return t.notify(e("noStatements"),"info");V(/^explain\b/i.test(s)?s:`EXPLAIN ${s}`)},y=s=>{if(M){if(s.key==="ArrowDown")return s.preventDefault(),A({...M,index:(M.index+1)%M.items.length});if(s.key==="ArrowUp")return s.preventDefault(),A({...M,index:(M.index-1+M.items.length)%M.items.length});if(s.key==="Enter"||s.key==="Tab")return s.preventDefault(),R();if(s.key==="Escape")return s.preventDefault(),A(null)}if((s.ctrlKey||s.metaKey)&&s.key==="Enter")return s.preventDefault(),de();if(s.ctrlKey&&s.key===" ")return s.preventDefault(),Y(!0);if(s.key==="Tab"){s.preventDefault();let r=s.currentTarget,p=r.selectionStart,N=r.selectionEnd;l(`${a.slice(0,p)}  ${a.slice(N)}`),requestAnimationFrame(()=>{r.selectionStart=r.selectionEnd=p+2})}},D=i?.results[u]??null,ge=()=>i?D?D.error?(0,P.jsxs)("div",{style:{padding:9},children:[(0,P.jsx)("div",{className:"dg-err",children:D.error}),(0,P.jsx)("pre",{className:"dg-pre",style:{marginTop:7,opacity:.7},children:D.statement})]}):D.columns.length===0?(0,P.jsxs)("div",{className:"dg-sqlmsg",children:[he(e("affected"),{n:D.affected??0})," \xB7 ",D.durationMs," ms"]}):(0,P.jsx)("div",{className:"dg-grid-wrap",children:(0,P.jsxs)("table",{className:"dg-grid",style:{width:"100%"},children:[(0,P.jsx)("thead",{children:(0,P.jsxs)("tr",{children:[(0,P.jsx)("th",{className:"dg-rownum",children:"#"}),D.columns.map(s=>(0,P.jsx)("th",{children:s.name},s.name))]})}),(0,P.jsx)("tbody",{children:D.rows.map((s,r)=>(0,P.jsxs)("tr",{children:[(0,P.jsx)("td",{className:"dg-rownum",children:r+1}),D.columns.map(p=>{let N=Ue(s[p.name],e("null"));return(0,P.jsx)("td",{className:N.isNull?"dg-null":"",title:N.text,children:N.text},p.name)})]},r))})]})}):(0,P.jsx)(ye,{title:e("emptyResult")}):(0,P.jsx)(ye,{title:e("runHint"),hint:e("completionHint")});return(0,P.jsxs)("div",{className:"dg-sql",children:[(0,P.jsxs)("div",{className:"dg-sql-top",children:[(0,P.jsxs)("div",{className:"dg-editor",children:[(0,P.jsx)("div",{className:"dg-gutter","aria-hidden":!0,children:(0,P.jsx)("div",{style:{transform:`translateY(${-L}px)`},children:Array.from({length:le},(s,r)=>r+1).join(`
`)})}),(0,P.jsxs)("div",{className:"dg-code",children:[(0,P.jsxs)("pre",{className:"dg-hl",ref:te,"aria-hidden":!0,children:[z.map((s,r)=>s.type==="ws"?s.value:(0,P.jsx)("span",{className:`dg-tok dg-tok-${s.type==="plain"?"ident":s.type}`,children:s.value},r)),(0,P.jsx)("span",{children:"\u200B"})]}),(0,P.jsx)("textarea",{ref:F,className:"dg-sql-text",value:a,spellCheck:!1,placeholder:"SELECT * FROM ...",onChange:s=>{l(s.target.value),requestAnimationFrame(()=>Y(!1))},onScroll:s=>{if(E(s.currentTarget.scrollTop),te.current){let r=s.currentTarget;te.current.scrollTop=r.scrollTop,te.current.scrollLeft=r.scrollLeft}},onKeyDown:y,onBlur:()=>setTimeout(()=>A(null),120)}),M?(0,P.jsx)("div",{className:"dg-complete",style:{left:M.left,top:M.top},children:M.items.map((s,r)=>(0,P.jsxs)("div",{className:`dg-complete-item${r===M.index?" dg-complete-item-on":""}`,onMouseDown:p=>{p.preventDefault(),A({...M,index:r}),requestAnimationFrame(R)},children:[(0,P.jsx)("span",{children:s.label}),(0,P.jsx)("span",{className:"dg-complete-kind",children:s.kind})]},`${s.kind}-${s.label}`))}):null]})]}),(0,P.jsxs)("div",{className:"dg-sqlbar",children:[(0,P.jsxs)(K,{size:"sm",variant:"primary",disabled:h,onClick:de,children:[h?(0,P.jsx)(xe,{}):(0,P.jsx)(T,{name:"play",size:10}),e("run")]}),h?(0,P.jsx)(K,{size:"sm",variant:"danger",onClick:()=>{G()},children:e("cancelQuery")}):null,(0,P.jsx)(K,{size:"sm",disabled:h,onClick:me,children:e("explain")}),(0,P.jsxs)(K,{size:"sm",onClick:()=>l($t(a)),children:[(0,P.jsx)(T,{name:"wand",size:10}),e("beautify")]}),(0,P.jsxs)(K,{size:"sm",onClick:()=>{ee(Q||`Query ${new Date().toISOString().slice(0,16).replace("T"," ")}`),U(!0)},children:[(0,P.jsx)(T,{name:"bookmark",size:10}),e("saveQuery")]}),(0,P.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{l(""),g(null),W(""),H("")},children:e("clear")}),(0,P.jsx)("span",{className:"dg-muted dg-hint",children:e("runHint")}),(0,P.jsx)("div",{className:"dg-spacer"}),w?(0,P.jsx)("span",{className:"dg-chip",children:w}):null]})]}),i&&i.results.length>1?(0,P.jsx)("div",{className:"dg-rtabs",children:i.results.map((s,r)=>(0,P.jsxs)("button",{type:"button",className:`dg-rtab${r===u?" dg-rtab-active":""}`,onClick:()=>m(r),children:[s.error?(0,P.jsx)(T,{name:"alert",size:10}):null,he(e("result"),{n:r+1})," \xB7 ",s.rowCount]},r))}):null,q&&!D?.error?(0,P.jsx)(ue,{tone:"error",onClose:()=>W(""),children:q}):null,(0,P.jsx)("div",{className:"dg-results",children:ge()}),B?(0,P.jsxs)(Se,{title:e("saveQuery"),width:420,onClose:()=>U(!1),footer:(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(K,{onClick:()=>U(!1),children:e("cancel")}),(0,P.jsx)(K,{variant:"primary",onClick:()=>{(async()=>{try{await _.saveQuery({name:Q.trim()||"Query",sql:a,connectionId:n.connectionId,database:n.database,scope:"user"}),U(!1),t.notify(e("querySaved"),"success"),t.onSaved()}catch(s){t.notify(s instanceof Error?s.message:String(s),"error")}})()},children:e("save")})]}),children:[(0,P.jsx)(oe,{label:e("queryName"),children:(0,P.jsx)(se,{value:Q,autoFocus:!0,onChange:s=>ee(s.target.value)})}),(0,P.jsx)("pre",{className:"dg-pre",style:{maxHeight:160,overflow:"auto"},children:a})]}):null]})}var J=require("react");var c=require("react/jsx-runtime"),An=[50,100,200,500];function Hn(t){let e=String(t??"").toLowerCase();if(/\b(json|jsonb|xml|text|clob|ntext|longtext|mediumtext|bytea)\b/.test(e))return!0;let n=/(?:var)?char(?:acter varying)?\s*\(\s*(\d+)\s*\)/.exec(e);return n?Number(n[1])>120:!1}function rn(t){let{t:e,tab:n,engine:a}=t,[l,i]=(0,J.useState)("data"),g={connectionId:n.connectionId,database:n.database,schema:n.schema,table:n.table},u=`${g.connectionId}|${g.database}|${g.schema}|${g.table}`,[m,h]=(0,J.useState)(null),[S,q]=(0,J.useState)(""),[W,w]=(0,J.useState)(0);return(0,J.useEffect)(()=>{let H=!1;return _.describe(g.connectionId,g.database,g.schema,g.table).then(M=>{H||(h(M),q(""))}).catch(M=>{H||q(M instanceof Error?M.message:String(M))}),()=>{H=!0}},[u,W]),(0,c.jsxs)("div",{className:"dg-content",children:[(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsx)(T,{name:n.tableKind==="view"?"view":"table",size:12}),(0,c.jsx)("span",{className:"dg-mono",children:n.table}),(0,c.jsx)("span",{className:"dg-chip",children:n.database||"main"}),n.schema?(0,c.jsx)("span",{className:"dg-chip",children:n.schema}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(Wt,{value:l,onChange:i,options:[{value:"data",label:e("data")},{value:"structure",label:e("structure")}]})]}),l==="data"?(0,c.jsx)(Kn,{t:e,scope:g,engine:a,notify:t.notify,meta:m,onRefreshMeta:()=>w(H=>H+1),onNewQuery:t.onNewQuery}):(0,c.jsx)(Bn,{t:e,meta:m,error:S,onRefresh:()=>w(H=>H+1)})]})}function Kn({t,scope:e,engine:n,notify:a,meta:l,onRefreshMeta:i,onNewQuery:g}){let[u,m]=(0,J.useState)(1),[h,S]=(0,J.useState)(100),[q,W]=(0,J.useState)({column:"",dir:""}),[w,H]=(0,J.useState)(""),[M,A]=(0,J.useState)(!1),[L,E]=(0,J.useState)([]),[B,U]=(0,J.useState)("AND"),[Q,ee]=(0,J.useState)(null),[F,te]=(0,J.useState)(!1),[le,z]=(0,J.useState)(""),[I,Y]=(0,J.useState)(null),[R,V]=(0,J.useState)(null),G=(0,J.useRef)(null),[de,me]=(0,J.useState)(0),[y,D]=(0,J.useState)(null),[ge,s]=(0,J.useState)(!1),[r,p]=(0,J.useState)([]),[N,X]=(0,J.useState)(null),ae=(0,J.useRef)(null),[fe,Pe]=(0,J.useState)(!1),[Fe,Le]=(0,J.useState)(null),Nt=(0,J.useRef)(null),nt=(0,J.useRef)(!1),St=(0,J.useRef)(null),Ct=d=>{G.current=d,V(d)},Ae=d=>{ae.current=d,X(d)},at=`${e.connectionId}|${e.database}|${e.schema}|${e.table}`,[Oe,We]=(0,J.useState)("");(0,J.useEffect)(()=>{if(Oe===w)return;let d=setTimeout(()=>{H(Oe),m(1)},320);return()=>clearTimeout(d)},[Oe,w]);let st=(0,J.useRef)(""),rt=(0,J.useRef)(!1),ot=`${at}|${w}|${q.column}|${q.dir}`;(0,J.useEffect)(()=>{let d=new AbortController,b=!1;te(!0),z("");let f=rt.current?"exact":st.current===ot?"none":"auto";return _.rows({...e,page:u,pageSize:h,orderBy:q.column,orderDir:q.dir,where:w,total:f},d.signal).then(k=>{b||(st.current=ot,rt.current=!1,G.current=null,V(null),ae.current=null,X(null),Y(null),ee(O=>({...k,total:typeof k.total=="number"?k.total:O?.total??k.rows.length,totalKind:k.totalKind==="none"&&O?O.totalKind:k.totalKind})))}).catch(k=>{b||k instanceof DOMException&&k.name==="AbortError"||(z(k instanceof Error?k.message:String(k)),ee(null))}).finally(()=>{b||te(!1)}),()=>{b=!0,d.abort()}},[at,u,h,q.column,q.dir,w,de,ot]);let Ce=l?.columns??[],je=(0,J.useMemo)(()=>Ce.filter(d=>d.primaryKey).map(d=>d.name),[Ce]),Et=(0,J.useCallback)(d=>{let b={};for(let f of je)b[f]=d[f];return b},[je]),Ee=Q?.rows??[],It=Q?.total??0,it=Math.max(1,Math.ceil(It/h)),ze=je.length===0,Qe=(Q?.columns??[]).filter(d=>!r.includes(d.name)),gn=Ce.length>0?Ce.map(d=>({name:d.name,type:d.type,primaryKey:!!d.primaryKey,nullable:d.nullable})):(Q?.columns??[]).map(d=>({name:d.name,type:d.type??"",primaryKey:!1,nullable:!0})),He=(0,J.useCallback)(()=>{st.current="",rt.current=!0,me(d=>d+1),i()},[i]);(0,J.useEffect)(()=>{Y(null),V(null)},[at,u,h,w,de]);let $e=(0,J.useMemo)(()=>{if(!I||!Q)return null;let d=[],b=0;for(let k=I.top;k<=I.bottom;k+=1){let O=Ee[k];if(O)for(let ne=I.left;ne<=I.right;ne+=1){let re=Qe[ne];if(!re)continue;b+=1;let ie=Number(O[re.name]);!Number.isNaN(ie)&&O[re.name]!==null&&d.push(ie)}}if(d.length===0)return{cells:b,count:0,sum:0,avg:0};let f=d.reduce((k,O)=>k+O,0);return{cells:b,count:d.length,sum:f,avg:f/d.length}},[I,Q,Ee]),un=d=>{W(b=>b.column!==d?{column:d,dir:"asc"}:b.dir==="asc"?{column:d,dir:"desc"}:{column:"",dir:""}),m(1)},pn=async()=>{if(!I||!Q)return;let d=[];for(let b=I.top;b<=I.bottom;b+=1){let f=Ee[b];f&&d.push(Qe.slice(I.left,I.right+1).map(k=>Xe(f[k.name])).join("	"))}try{await navigator.clipboard.writeText(d.join(`
`)),a(t("copied"),"success")}catch{a(t("error"),"error")}},Rt=async()=>{let d=G.current;if(G.current=null,V(null),!d)return;let b=d.original===null||d.original===void 0?"":String(d.original);if(d.value!==b){if(ze)return a(t("noPrimaryKey"),"error");try{await _.updateRow({...e,key:d.key,changes:{[d.columnName]:d.value===""&&d.original===null?null:d.value}}),a(t("cellSaved"),"success"),He()}catch(f){a(f instanceof Error?f.message:String(f),"error")}}},mn=async d=>{let b=Ee[d];if(!b||ze||!window.confirm(t("confirmDelete")))return;let f={};for(let k of je)f[k]=b[k];try{await _.deleteRow({...e,key:f}),a(t("deleted"),"success"),He()}catch(k){a(k instanceof Error?k.message:String(k),"error")}},Je=async d=>{try{let b=await _.exportRows({...e,where:w,orderBy:q.column,orderDir:q.dir}),f=Lt(e.table);if(d==="csv"){let k=b.columns.map(ne=>ne.name),O=[k.map(Xe).join(",")].concat(b.rows.map(ne=>k.map(re=>Xe(ne[re])).join(","))).join(`\r
`);Ve(`${f}.csv`,"text/csv",O)}else d==="json"?Ve(`${f}.json`,"application/json",JSON.stringify(b.rows,null,2)):d==="insert"?Ve(`${f}.sql`,"application/sql",At(n,e,b.columns,b.rows)):Ve(`${f}.md`,"text/markdown",Ht(b.columns,b.rows));b.truncated&&a(he(t("exportTruncated"),{n:b.rows.length}),"info")}catch(b){a(b instanceof Error?b.message:String(b),"error")}},Tt=200,vn=async d=>{let b=await d.text(),f=Kt(b);if(f.errors.length>0){a(he(t("importFailed"),{n:0,error:f.errors.slice(0,3).join("; ")}),"error");return}if(f.header.length===0||f.rows.length===0){a(t("importEmpty"),"error");return}let k=new Set((Ce.length?Ce:Q?.columns??[]).map(ie=>ie.name));if(k.size===0){a(t("importNoColumns"),"error");return}let O=f.header.filter(ie=>!k.has(ie));if(O.length>0){a(he(t("importUnknownColumns"),{cols:O.join(", ")}),"error");return}let ne=f.rows.map(ie=>{let Re={};return f.header.forEach((lt,xn)=>{let Mt=ie[xn]??"";Re[lt]=Mt===""?null:Mt}),Re});s(!0);let re=0;try{for(let ie=0;ie<ne.length;ie+=Tt){let Re=ne.slice(ie,ie+Tt),lt=await _.insertRows({...e,rows:Re});re+=lt.inserted}a(he(t("importDone"),{n:re}),"success"),He()}catch(ie){let Re=ie instanceof Error?ie.message:String(ie);a(he(t("importFailed"),{n:re,error:Re}),"error")}finally{s(!1)}},hn=async()=>{try{let d=await _.insertRow({...e,values:{}});a(d.affected>0?t("rowInserted"):t("insertRowFailed"),d.affected>0?"success":"error"),He()}catch(d){a(d instanceof Error?d.message:String(d),"error")}},fn=d=>{let b=Ee[d];if(!b||ze)return;if(F)return a(t("loading"),"info");let f=(Q?.columns??[]).map(ne=>ne.name),k={},O={};for(let ne of f){let re=b[ne];O[ne]=re,k[ne]=re==null?"":String(re)}Ae({key:Et(b),original:O,draft:k,fields:f})},bn=async()=>{let d=ae.current;if(!d)return;let b={};for(let f of d.fields){let k=d.original[f],O=k==null?"":String(k),ne=d.draft[f]??"";if(ne===O)continue;let re=Ce.find(ie=>ie.name===f);b[f]=ne===""&&(re?.nullable??!0)?null:ne}if(Object.keys(b).length===0){Ae(null);return}Pe(!0);try{await _.updateRow({...e,key:d.key,changes:b}),a(t("rowSaved"),"success"),Ae(null),He()}catch(f){a(f instanceof Error?f.message:String(f),"error")}finally{Pe(!1)}},dt=(d,b,f)=>{Y(k=>f&&k?{top:Math.min(k.top,d),left:Math.min(k.left,b),bottom:Math.max(k.bottom,d),right:Math.max(k.right,b)}:{top:d,left:b,bottom:d,right:b})},yn=d=>{if((d.ctrlKey||d.metaKey)&&d.key.toLowerCase()==="c"){d.preventDefault(),pn();return}if(!I)return;let f={ArrowUp:[-1,0],ArrowDown:[1,0],ArrowLeft:[0,-1],ArrowRight:[0,1]}[d.key];if(!f)return;d.preventDefault();let k=Math.max(0,Math.min(Ee.length-1,I.top+f[0])),O=Math.max(0,Math.min(Qe.length-1,I.left+f[1]));dt(k,O,d.shiftKey)},wn=Qe.map((d,b)=>(0,c.jsxs)("th",{className:q.column===d.name?"dg-th-sorted":"",onClick:()=>un(d.name),title:d.name,children:[d.name,q.column===d.name?(0,c.jsx)("span",{className:"dg-sortmark",children:q.dir==="desc"?"\u25BC":"\u25B2"}):null,je.includes(d.name)?(0,c.jsx)("span",{className:"dg-colkey",title:t("primaryKey"),children:(0,c.jsx)(T,{name:"key",size:10})}):null,(0,c.jsx)("span",{className:"dg-colresize",onMouseDown:f=>{f.stopPropagation();let k=f.clientX,O=f.target.parentElement,ne=O?.offsetWidth??160,re=Re=>{O&&(O.style.width=`${Math.max(60,ne+Re.clientX-k)}px`)},ie=()=>{window.removeEventListener("mousemove",re),window.removeEventListener("mouseup",ie)};window.addEventListener("mousemove",re),window.addEventListener("mouseup",ie)},onClick:f=>f.stopPropagation()})]},d.name));return(0,c.jsxs)("div",{className:"dg-content",children:[ze?(0,c.jsx)(ue,{tone:"info",children:t("noPrimaryKey")}):null,le?(0,c.jsx)(ue,{tone:"error",onClose:()=>z(""),children:le}):null,(0,c.jsxs)("div",{className:"dg-subbar",children:[(0,c.jsxs)(K,{size:"sm",active:!!w,onClick:()=>{let d=vt(n,{joiner:B,conditions:L});We(d),H(d),m(1)},children:[(0,c.jsx)(T,{name:"filter",size:11}),t("filter")]}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>A(d=>!d),children:t("filterBuilder")}),(0,c.jsx)(se,{value:Oe,placeholder:t("rawWhere"),style:{flex:1,minWidth:120,maxWidth:380},onChange:d=>We(d.target.value),onKeyDown:d=>{d.key==="Enter"&&(H(Oe),m(1))}}),w?(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{We(""),H(""),E([]),m(1)},children:t("clear")}):null,g&&n!=="redis"?(0,c.jsxs)(K,{size:"sm",variant:"tonal",onClick:g,title:t("newQuery"),children:[(0,c.jsx)(T,{name:"play",size:10}),t("newQuery")]}):null,(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsxs)("span",{className:"dg-chip",title:Q?.totalKind==="estimate"?t("estimatedTotal"):void 0,children:[Q?.totalKind==="estimate"?"\u2248 ":"",(0,c.jsx)("b",{children:It})," ",t("rows")]}),(0,c.jsx)(ce,{icon:"refresh",title:t("refresh"),onClick:He}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:()=>{hn()},children:t("insertRow")}),(0,c.jsx)("input",{ref:Nt,type:"file",accept:".csv,text/csv",style:{display:"none"},onChange:d=>{let b=d.target.files?.[0];b&&vn(b),d.target.value=""}}),(0,c.jsxs)(K,{size:"sm",variant:"ghost",disabled:ge,onClick:()=>Nt.current?.click(),children:[ge?(0,c.jsx)(xe,{}):null,t("importCsv")]}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:d=>{let b=d.currentTarget.getBoundingClientRect();Le({x:b.left,y:b.bottom+2})},children:t("columnChooser")}),(0,c.jsx)(K,{size:"sm",variant:"ghost",onClick:d=>{let b=d.currentTarget.getBoundingClientRect();D({x:b.left,y:b.bottom+2})},children:t("exportAs")})]}),M?(0,c.jsxs)("div",{className:"dg-subbar",style:{gap:6,flexWrap:"wrap"},children:[(0,c.jsxs)(we,{value:B,onChange:d=>U(d.target.value),children:[(0,c.jsx)("option",{value:"AND",children:t("matchAll")}),(0,c.jsx)("option",{value:"OR",children:t("matchAny")})]}),L.map((d,b)=>(0,c.jsxs)("span",{className:"dg-row",style:{gap:3},children:[(0,c.jsx)(we,{value:d.column,onChange:f=>E(k=>k.map((O,ne)=>ne===b?{...O,column:f.target.value}:O)),children:Ce.map(f=>(0,c.jsx)("option",{value:f.name,children:f.name},f.name))}),(0,c.jsx)(we,{value:d.op,onChange:f=>E(k=>k.map((O,ne)=>ne===b?{...O,op:f.target.value}:O)),children:Dt.map(f=>(0,c.jsx)("option",{value:f,children:f},f))}),(0,c.jsx)(se,{value:d.value,style:{width:120},onChange:f=>E(k=>k.map((O,ne)=>ne===b?{...O,value:f.target.value}:O))}),(0,c.jsx)(ce,{icon:"x",title:t("delete"),size:10,onClick:()=>E(f=>f.filter((k,O)=>O!==b))})]},b)),(0,c.jsxs)(K,{size:"sm",onClick:()=>E(d=>d.concat({column:Ce[0]?.name??"",op:"=",value:""})),children:[(0,c.jsx)(T,{name:"plus",size:10}),t("addCondition")]}),(0,c.jsx)(K,{size:"sm",variant:"primary",onClick:()=>{let d=vt(n,{joiner:B,conditions:L});We(d),H(d),m(1)},children:t("apply")})]}):null,(0,c.jsxs)("div",{className:"dg-grid-wrap",children:[F&&!Q?(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(xe,{label:t("loading")})}):null,Q&&Ee.length===0?(0,c.jsx)(ye,{title:t("emptyTable")}):null,Q&&Ee.length>0?(0,c.jsxs)("table",{className:"dg-grid",ref:St,tabIndex:0,onKeyDown:yn,children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{className:"dg-rownum",children:"#"}),wn,(0,c.jsx)("th",{style:{width:26}})]})}),(0,c.jsx)("tbody",{children:Ee.map((d,b)=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{className:`dg-rownum${ze?"":" dg-rownum-editable"}`,title:ze?void 0:t("editRow"),onClick:()=>fn(b),children:(u-1)*h+b+1}),Qe.map((f,k)=>{let O=Ue(d[f.name],t("null")),ne=I&&b>=I.top&&b<=I.bottom&&k>=I.left&&k<=I.right;return R&&R.rowIndex===b&&R.columnName===f.name?(0,c.jsx)("td",{className:"dg-cell-editing",children:(0,c.jsx)("input",{autoFocus:!0,value:R.value,onChange:re=>Ct({...R,value:re.target.value}),onBlur:()=>{Rt()},onKeyDown:re=>{re.key==="Enter"&&(re.preventDefault(),Rt()),re.key==="Escape"&&(G.current=null,V(null))}})},f.name):(0,c.jsx)("td",{className:`${ne?"dg-cell-selected":""}${O.isNull?" dg-null":""}${/int|numeric|decimal|real|double|float|money/i.test(f.type??"")?" dg-cell-num":""}`,title:O.isNull?t("null"):O.text,onMouseDown:re=>{nt.current=!0,St.current?.focus(),dt(b,k,re.shiftKey);let ie=()=>{nt.current=!1,window.removeEventListener("mouseup",ie)};window.addEventListener("mouseup",ie)},onMouseEnter:()=>{nt.current&&dt(b,k,!1)},onDoubleClick:()=>{if(ze)return a(t("noPrimaryKey"),"error");if(F)return a(t("loading"),"info");Ct({rowIndex:b,columnName:f.name,key:Et(d),original:d[f.name],value:O.isNull?"":String(d[f.name])})},children:O.text},f.name)}),(0,c.jsx)("td",{children:(0,c.jsx)(ce,{icon:"trash",title:t("deleteRow"),size:11,onClick:()=>{mn(b)}})})]},b))})]}):null]}),(0,c.jsxs)("div",{className:"dg-pager",children:[(0,c.jsx)(ce,{icon:"chevronLeft",title:t("prev"),size:11,disabled:u<=1,onClick:()=>m(d=>Math.max(1,d-1))}),(0,c.jsx)("span",{children:he(t("page"),{page:u,pages:it})}),(0,c.jsx)(ce,{icon:"chevron",title:t("next"),size:11,disabled:u>=it,onClick:()=>m(d=>Math.min(it,d+1))}),(0,c.jsx)("div",{className:"dg-spacer"}),$e&&$e.cells>0?(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("span",{className:"dg-chip",children:he(t("selection"),{n:$e.cells})}),$e.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("sum")," ",(0,c.jsx)("b",{children:$e.sum.toFixed(2)})]}):null,$e.count>0?(0,c.jsxs)("span",{className:"dg-chip",children:[t("avg")," ",(0,c.jsx)("b",{children:$e.avg.toFixed(2)})]}):null]}):null,(0,c.jsx)("span",{children:t("pageSize")}),(0,c.jsx)(we,{value:String(h),onChange:d=>{S(Number(d.target.value)),m(1)},children:An.map(d=>(0,c.jsx)("option",{value:String(d),children:d},d))})]}),Fe?(0,c.jsx)(Be,{x:Fe.x,y:Fe.y,onClose:()=>Le(null),items:[...(Q?.columns??[]).map(d=>{let b=!r.includes(d.name);return{label:d.name,icon:b?"check":void 0,onClick:()=>p(f=>f.includes(d.name)?f.filter(k=>k!==d.name):f.concat(d.name))}}),...r.length>0?[{separator:!0},{label:t("showAll"),icon:"columns",onClick:()=>p([])}]:[]]}):null,y?(0,c.jsx)(Be,{x:y.x,y:y.y,onClose:()=>D(null),items:[{label:t("exportCsv"),onClick:()=>{Je("csv")}},{label:t("exportJson"),onClick:()=>{Je("json")}},{label:t("exportInsert"),onClick:()=>{Je("insert")}},{label:t("exportMarkdown"),onClick:()=>{Je("markdown")}}]}):null,N?(0,c.jsx)(Se,{title:`${t("editRow")} \xB7 ${Object.values(N.key).map(d=>String(d)).join(", ")}`,width:560,busy:fe,onClose:()=>Ae(null),footer:(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(K,{onClick:()=>Ae(null),children:t("cancel")}),(0,c.jsx)(K,{variant:"primary",disabled:fe,onClick:()=>{bn()},children:t("save")})]}),children:(0,c.jsx)("div",{className:"dg-form",children:gn.map(d=>{let b=N.draft[d.name]??"",f=k=>{let O=ae.current;O&&Ae({...O,draft:{...O.draft,[d.name]:k}})};return(0,c.jsx)(oe,{label:`${d.name}${d.primaryKey?" \xB7 PK":""}`,children:Hn(d.type)?(0,c.jsx)(Ye,{rows:3,value:b,onChange:k=>f(k.target.value)}):(0,c.jsx)(se,{value:b,placeholder:d.nullable?t("null"):"",onChange:k=>f(k.target.value)})},d.name)})})}):null]})}function Bn({t,meta:e,error:n,onRefresh:a}){let l=e;return n?(0,c.jsx)(ue,{tone:"error",children:n}):l?(0,c.jsxs)("div",{className:"dg-struct",children:[(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-fields",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("columns"),(0,c.jsx)("span",{className:"dg-badge",children:l.columns.length}),(0,c.jsx)("div",{className:"dg-spacer"}),(0,c.jsx)(ce,{icon:"refresh",title:t("refresh"),size:11,onClick:a})]}),(0,c.jsx)("div",{className:"dg-struct-body",style:{padding:0},children:(0,c.jsxs)("table",{className:"dg-grid dg-grid-fixed",style:{width:"100%"},children:[(0,c.jsx)("thead",{children:(0,c.jsxs)("tr",{children:[(0,c.jsx)("th",{style:{width:"30%"},children:t("name")}),(0,c.jsx)("th",{style:{width:"34%"},children:t("type")}),(0,c.jsx)("th",{style:{width:"12%"},children:t("nullable")}),(0,c.jsx)("th",{style:{width:"24%"},children:t("default")})]})}),(0,c.jsx)("tbody",{children:l.columns.map(i=>(0,c.jsxs)("tr",{children:[(0,c.jsx)("td",{children:(0,c.jsxs)("span",{className:"dg-row",children:[i.primaryKey?(0,c.jsx)(T,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono dg-truncate",children:i.name})]})}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:i.type,children:i.type}),(0,c.jsx)("td",{children:i.nullable?"YES":"NO"}),(0,c.jsx)("td",{className:"dg-mono dg-truncate",title:i.defaultValue??"",children:i.defaultValue===null?"\u2014":String(i.defaultValue)})]},i.name))})]})})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-indexes",children:[(0,c.jsxs)("div",{className:"dg-struct-head",children:[t("indexes"),(0,c.jsx)("span",{className:"dg-badge",children:l.indexes.length})]}),(0,c.jsx)("div",{className:"dg-struct-body",children:l.indexes.length===0?(0,c.jsx)("div",{className:"dg-muted",children:t("noIndexes")}):l.indexes.map(i=>(0,c.jsxs)("div",{className:"dg-idx",children:[i.primary?(0,c.jsx)(T,{name:"key",size:10}):null,(0,c.jsx)("span",{className:"dg-mono",children:i.name}),(0,c.jsx)("span",{className:"dg-tag",children:i.unique?"unique":"index"}),(0,c.jsx)("span",{className:"dg-muted dg-truncate",children:i.columns.join(", ")})]},i.name))})]}),(0,c.jsxs)("div",{className:"dg-struct-col dg-struct-col-ddl",children:[(0,c.jsx)("div",{className:"dg-struct-head",children:t("ddl")}),(0,c.jsx)("div",{className:"dg-struct-body",children:(0,c.jsx)("pre",{className:"dg-pre",children:l.ddl||"\u2014"})})]})]}):(0,c.jsx)("div",{className:"dg-sqlmsg",children:(0,c.jsx)(xe,{label:t("loading")})})}function on(t,e){return`SELECT * FROM ${Ke(t,e)} LIMIT 100;`}var qe=require("react");var $=require("react/jsx-runtime"),Fn={red:"var(--dsw-alias-state-error-primary)",yellow:"var(--dsw-alias-state-warn-primary)",green:"var(--dsw-alias-state-success-primary)"};function dn(t){let{store:e,t:n}=t,a=be(e.connections),l=be(e.catalog),[i,g]=(0,qe.useState)(""),[u,m]=(0,qe.useState)(()=>new Set),[h,S]=(0,qe.useState)(()=>new Set),[q,W]=(0,qe.useState)(()=>new Set),w=(z,I)=>I(Y=>{let R=new Set(Y);return R.has(z)?R.delete(z):R.add(z),R}),H=i.trim().toLowerCase(),M=(0,qe.useMemo)(()=>{let z=new Map;for(let I of a.items){let Y=I.group||n("noGroups"),R=z.get(Y)??[];R.push(I),z.set(Y,R)}return[...z.entries()].sort((I,Y)=>I[0].localeCompare(Y[0]))},[a.items,n]),A=async z=>{e.connections.select(z.id);let I=e.connections.session(z.id).status;if(I==="open"||I==="opening"){w(z.id,m);return}m(Y=>new Set(Y).add(z.id)),await e.connections.connect(z.id)},L=async(z,I)=>{t.onSelectDatabase(z,I);let Y=`${z.id}|${I.name}`;S(R=>new Set(R).add(Y)),z.engine!=="redis"&&await e.catalog.loadRelations(z.id,I.name,I.schemas[0]??"")},E=(z,I,Y,R,V)=>(0,$.jsxs)("div",{className:"dg-trow",style:{paddingLeft:V*13+4},title:`${R.name}${R.rows!==null?` \xB7 ${R.rows} rows`:""}`,onClick:()=>t.onOpenTable(z,I,Y,R),children:[(0,$.jsx)("span",{className:"dg-twist"}),(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(T,{name:R.kind==="view"?"view":"table",size:11})}),(0,$.jsx)("span",{className:"dg-tlabel",children:R.name}),R.rows!==null?(0,$.jsx)("span",{className:"dg-badge",children:R.rows}):null]},`${z.id}|${I.name}|${Y}|${R.name}`),B=(z,I)=>{let Y=`${z.id}|${I.name}`,R=h.has(Y),V=I.schemas.length?I.schemas:[""];return(0,$.jsxs)("div",{children:[(0,$.jsxs)("div",{className:`dg-trow dg-trow-db${t.selectedDatabaseKey===Y?" dg-trow-active":""}`,title:I.name,onClick:()=>{L(z,I)},onContextMenu:G=>{G.preventDefault(),t.onDatabaseMenu(G,z,I)},children:[(0,$.jsx)("span",{className:`dg-twist${R?" dg-twist-open":""}`,onClick:G=>{G.stopPropagation(),w(Y,S),!R&&z.engine!=="redis"&&e.catalog.loadRelations(z.id,I.name,V[0]??"")},children:(0,$.jsx)(T,{name:"chevron",size:9})}),(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(T,{name:"database",size:11})}),(0,$.jsx)("span",{className:"dg-tlabel",children:I.name}),I.schemas.length>1?(0,$.jsx)("span",{className:"dg-badge",children:I.schemas.length}):null]}),R?V.map(G=>{let de=`${Y}|${G}`,me=!G||q.has(de),y=l.relations[`${z.id}|${I.name}|${G}`]??[],D=l.loading[`${z.id}|${I.name}|${G}`]===!0;return(0,$.jsxs)("div",{children:[G?(0,$.jsxs)("div",{className:"dg-trow",style:{paddingLeft:17},onClick:()=>{w(de,W),me||e.catalog.loadRelations(z.id,I.name,G)},children:[(0,$.jsx)("span",{className:`dg-twist${me?" dg-twist-open":""}`,children:(0,$.jsx)(T,{name:"chevron",size:9})}),(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(T,{name:"folder",size:11})}),(0,$.jsx)("span",{className:"dg-tlabel",children:G})]}):null,me?D&&y.length===0?(0,$.jsx)("div",{className:"dg-muted",style:{padding:`2px 8px 2px ${(G?3:2)*13+16}px`},children:n("loading")}):y.map(ge=>E(z,I,G,ge,G?3:2)):null]},G||"_default")}):null]},Y)},[U,Q]=(t.selectedDatabaseKey||"").split("|"),ee=a.items.find(z=>z.id===U),F=ee?ee.engine!=="redis":!1,te=!!(ee&&Q&&F),le=ee&&Q?e.connections.session(ee.id).databases.find(z=>z.name===Q)??{name:Q,schemas:[""]}:null;return(0,$.jsxs)("div",{className:"dg-tree",children:[(0,$.jsxs)("div",{className:"dg-panehead",children:[(0,$.jsx)(T,{name:"database",size:11}),n("connections"),(0,$.jsx)("span",{className:"dg-badge",children:a.items.length}),(0,$.jsx)("div",{className:"dg-spacer"}),(0,$.jsx)(ce,{icon:"refresh",title:n("refresh"),size:11,onClick:()=>{e.connections.load(),e.meta.load()}})]}),(0,$.jsxs)("div",{className:"dg-row",style:{padding:"4px 6px",gap:4},children:[(0,$.jsxs)("div",{className:"dg-search",children:[(0,$.jsx)(T,{name:"search",size:10}),(0,$.jsx)("input",{value:i,placeholder:n("search"),onChange:z=>g(z.target.value)})]}),te&&t.onNewQuery&&ee&&le?(0,$.jsxs)(K,{size:"sm",variant:"tonal",title:n("newQuery"),onClick:()=>t.onNewQuery?.(ee,le),children:[(0,$.jsx)(T,{name:"play",size:10}),n("newQuery")]}):null]}),(0,$.jsxs)("div",{className:"dg-tree-scroll",children:[a.loading&&a.items.length===0?(0,$.jsx)("div",{className:"dg-muted",style:{padding:8},children:n("loading")}):null,a.error?(0,$.jsx)("div",{className:"dg-banner dg-banner-error",children:a.error}):null,M.map(([z,I])=>{let Y=I.filter(R=>!H||R.name.toLowerCase().includes(H)?!0:e.connections.session(R.id).databases.some(G=>G.name.toLowerCase().includes(H)));return Y.length===0?null:(0,$.jsxs)("div",{children:[(0,$.jsxs)("div",{className:"dg-group",children:[(0,$.jsx)("span",{className:"dg-twist"}),(0,$.jsx)("span",{className:"dg-truncate",children:z}),(0,$.jsx)("span",{className:"dg-badge",children:Y.length})]}),Y.map(R=>{let V=e.connections.session(R.id),G=u.has(R.id)&&V.status==="open";return(0,$.jsxs)("div",{children:[(0,$.jsxs)("div",{className:`dg-trow${a.activeId===R.id?" dg-trow-active":""}`,onClick:()=>{A(R)},onContextMenu:de=>{de.preventDefault(),t.onConnectionMenu(de,R)},title:`${R.name} \xB7 ${R.engine}`,children:[(0,$.jsx)("span",{className:`dg-twist${G?" dg-twist-open":""}`,children:(0,$.jsx)(T,{name:"chevron",size:9})}),R.color!=="none"?(0,$.jsx)("span",{className:"dg-colorbar",style:{background:Fn[R.color]}}):null,(0,$.jsx)("span",{className:"dg-ticon",children:(0,$.jsx)(T,{name:"database",size:12})}),(0,$.jsx)("span",{className:"dg-tlabel",children:R.name}),(0,$.jsx)("span",{className:"dg-badge",children:R.engine}),(0,$.jsx)(Jt,{status:V.status})]}),V.status==="opening"?(0,$.jsxs)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:[n("connect"),"\u2026"]}):null,V.status==="error"?(0,$.jsx)("div",{className:"dg-muted dg-hint",style:{padding:"2px 8px 2px 30px"},children:V.error||n("error")}):null,G?V.databases.map(de=>B(R,de)):null]},R.id)})]},z)}),!a.loading&&a.items.length===0?(0,$.jsx)("div",{className:"dg-muted dg-hint",style:{padding:10},children:n("selectConnection")}):null]})]})}var C=require("react/jsx-runtime"),On=[{id:"tables",labelKey:"tables",icon:"table",target:"relations",relation:"table"},{id:"views",labelKey:"views",icon:"view",target:"relations",relation:"view"},{id:"functions",labelKey:"functions",icon:"function",target:"routines"},{id:"users",labelKey:"users",icon:"user",target:"accounts"},{id:"queries",labelKey:"queries",icon:"bookmark",target:"queries"}];function ln({t}){let e=t??(s=>s),[n]=(0,Ne.useState)(()=>new Ge),a=be(n.connections),l=be(n.meta),i=be(n.tabs),[g,u]=(0,Ne.useState)(null),[m,h]=(0,Ne.useState)(null),[S,q]=(0,Ne.useState)(null),[W,w]=(0,Ne.useState)(null),[H,M]=(0,Ne.useState)(null),[A,L]=(0,Ne.useState)(262);(0,Ne.useEffect)(()=>{n.bootstrap()},[n]),(0,Ne.useEffect)(()=>{if(!H)return;let s=setTimeout(()=>M(null),3600);return()=>clearTimeout(s)},[H]);let E=(s,r="info")=>M({message:s,tone:r}),B=s=>a.items.find(r=>r.id===s),U=s=>B(s)?.engine??"sqlite",Q=(s,r)=>{let p=r.schemas[0]??"";if(u({connectionId:s.id,database:r.name,schema:p}),s.engine==="redis"){n.tabs.open({id:`redis:${s.id}:${r.name}`,kind:"redis",connectionId:s.id,database:r.name,title:r.name});return}n.catalog.loadRelations(s.id,r.name,p),n.tabs.open({id:`relations:${s.id}:${r.name}:${p}:table`,kind:"relations",connectionId:s.id,database:r.name,schema:p,relation:"table",title:r.name})},ee=(s,r)=>{u({connectionId:s.id,database:r.name,schema:r.schemas[0]??""}),n.tabs.open({id:`overview:${s.id}:${r.name}`,kind:"overview",connectionId:s.id,database:r.name,title:r.name})},F=(s,r,p,N)=>{n.tabs.open({id:`table:${s.id}:${r}:${p}:${N.name}`,kind:"table",connectionId:s.id,database:r,schema:p,table:N.name,tableKind:N.kind,title:N.name})},te=(s,r="table",p=g)=>{if(s==="queries"){n.tabs.open({id:"queries",kind:"queries",connectionId:"",database:"",schema:"",title:e("queries")});return}if(!p)return E(e("selectDatabase"),"info");if(s==="accounts"){n.tabs.open({id:`accounts:${p.connectionId}`,kind:"accounts",connectionId:p.connectionId,database:p.database,schema:"",title:e("users")});return}if(s==="relations"){n.tabs.open({id:`relations:${p.connectionId}:${p.database}:${p.schema}:${r}`,kind:"relations",connectionId:p.connectionId,database:p.database,schema:p.schema,relation:r,title:p.database});return}n.tabs.open({id:`${s}:${p.connectionId}:${p.database}:${p.schema}`,kind:s,connectionId:p.connectionId,database:p.database,schema:p.schema,title:e(s==="routines"?"functions":"users")})},le=(s,r,p)=>{let N=s??(g?B(g.connectionId):null);if(!N||N.engine==="redis")return;let X=r??(g&&g.connectionId===N.id?g.database:n.connections.session(N.id).databases[0]?.name??"");if(!X)return;let ae=i.tabs.filter(fe=>fe.kind==="sql").length+1;n.tabs.open({id:`sql:${N.id}:${X}:${Date.now()}`,kind:"sql",connectionId:N.id,database:X,title:`${e("query")} ${ae} (${X})`,initialSql:p??""})},z=s=>{let r=B(s.connectionId)??a.items[0];if(!r)return h({kind:"connection"});n.tabs.open({id:`sql:saved:${s.id}:${Date.now()}`,kind:"sql",connectionId:r.id,database:s.database,title:s.name,initialSql:s.sql})},I=async s=>{let r=m&&m.kind==="connection"?m.initial:void 0;if(r)await n.connections.update(r.id,s),n.tabs.closeConnection(r.id),E(e("saved"),"success");else{let p=await n.connections.create(s);E(p.ok?he(e("testOk"),{version:p.serverVersion??"",ms:p.latencyMs??0}):e("saved"),p.ok?"success":"info")}h(null)},Y=(s,r)=>{let p=n.connections.session(r.id).status;w({x:s.clientX,y:s.clientY,items:[p==="open"?{label:e("disconnect"),icon:"unplug",onClick:()=>{n.connections.disconnect(r.id)}}:{label:e("connect"),icon:"plug",onClick:()=>{n.connections.connect(r.id)}},{label:e("test"),icon:"check",onClick:()=>{n.connections.test(r.id).then(N=>E(he(e("testOk"),{version:N.serverVersion??"",ms:N.latencyMs??0}),"success"),N=>E(N instanceof Error?N.message:String(N),"error"))}},{separator:!0},...r.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>le(r)}]:[],{label:e("edit"),icon:"pencil",onClick:()=>h({kind:"connection",initial:r})},{label:e("refresh"),icon:"refresh",onClick:()=>{n.connections.reloadDatabases(r.id)}},{separator:!0},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>q(r)}]})},R=(s,r,p)=>{let N={connectionId:r.id,database:p.name,schema:p.schemas[0]??""},X=(ae,fe="table")=>{u(N),te(ae,fe,N)};w({x:s.clientX,y:s.clientY,items:[{label:e("overview"),icon:"info",onClick:()=>ee(r,p)},{label:e("tables"),icon:"table",onClick:()=>X("relations","table")},{label:e("views"),icon:"view",onClick:()=>X("relations","view")},{label:e("functions"),icon:"function",onClick:()=>X("routines")},{separator:!0},...r.engine!=="redis"?[{label:e("newQuery"),icon:"play",onClick:()=>le(r,p.name)}]:[]]})},V=n.bindings(),G=g?`${g.connectionId}|${g.database}`:"",de=i.tabs.find(s=>s.id===i.activeId)??null,me=(0,C.jsxs)("div",{className:"dg-toolbar",children:[(0,C.jsxs)("div",{className:"dg-brand",children:[(0,C.jsx)("span",{className:"dg-brand-badge",children:(0,C.jsx)(T,{name:"database",size:15})}),(0,C.jsx)("span",{className:"dg-brand-title",children:e("panel")})]}),(0,C.jsx)("div",{className:"dg-toolbar-divider"}),(0,C.jsx)("div",{className:"dg-toolgroup dg-obj-pills",children:On.map(s=>(0,C.jsxs)(K,{size:"sm",variant:"ghost",onClick:()=>te(s.target,s.relation),title:e(s.labelKey),children:[(0,C.jsx)(T,{name:s.icon,size:11}),e(s.labelKey)]},s.id))}),(0,C.jsx)("div",{className:"dg-spacer"}),(0,C.jsxs)("button",{type:"button",className:`dg-binding-chip${V.length>0?" dg-binding-chip-active":""}`,onClick:()=>h({kind:"workspaces"}),title:V.length>0?`${e("boundProject")}: ${V.map(s=>s.connectionName||s.connectionId).join(", ")}`:e("projectUnbound"),children:[(0,C.jsx)("span",{className:`dg-dot${V.length>0?" dg-dot-open":""}`}),(0,C.jsx)(T,{name:"link",size:11}),(0,C.jsx)("span",{className:"dg-binding-chip-label",children:V.length>0?`${e("boundProject")}: ${V[0].connectionName||V[0].connectionId}${V.length>1?` (+${V.length-1})`:""}`:e("workspaces")})]}),(0,C.jsx)(ce,{icon:"refresh",title:e("refresh"),onClick:()=>{n.connections.load(),n.meta.load()}}),(0,C.jsxs)(K,{className:"dg-btn-new-conn",onClick:()=>h({kind:"connection"}),title:e("newConnection"),children:[(0,C.jsx)(T,{name:"plus",size:11}),e("newConnection")]})]}),y=i.tabs.length?(0,C.jsx)("div",{className:"dg-tabs",role:"tablist",children:i.tabs.map(s=>(0,C.jsxs)("div",{role:"tab",tabIndex:s.id===i.activeId?0:-1,"aria-selected":s.id===i.activeId,className:`dg-tab${s.id===i.activeId?" dg-tab-active":""}`,onClick:()=>n.tabs.activate(s.id),onKeyDown:r=>{if(r.key==="Enter"||r.key===" "){r.preventDefault(),n.tabs.activate(s.id);return}let p=r.key==="ArrowRight"?1:r.key==="ArrowLeft"?-1:0;if(p===0)return;r.preventDefault();let N=r.currentTarget.parentElement?.children,X=N?.length??0;if(!X)return;let ae=i.tabs[(i.tabs.findIndex(fe=>fe.id===s.id)+p+X)%X];ae&&(n.tabs.activate(ae.id),N?.[i.tabs.indexOf(ae)]?.focus())},title:s.title,children:[(0,C.jsx)(T,{name:s.kind==="table"?s.tableKind==="view"?"view":"table":s.kind==="sql"?"play":s.kind==="queries"?"bookmark":s.kind==="redis"?"database":"info",size:10}),(0,C.jsx)("span",{className:"dg-tab-label",children:s.title}),(0,C.jsx)("button",{type:"button",className:"dg-tab-close","aria-label":`${e("close")} ${s.title}`,onClick:r=>{r.stopPropagation(),n.tabs.close(s.id)},children:(0,C.jsx)(T,{name:"x",size:9})})]},s.id))}):null,D=i.tabs.map(s=>{let r=B(s.connectionId),p=(()=>{switch(s.kind){case"overview":{let N=n.connections.session(s.connectionId).databases.find(X=>X.name===s.database);return N?(0,C.jsx)(Zt,{t:e,store:n,connectionId:s.connectionId,database:N,schemas:N.schemas,onOpenRelations:X=>te("relations",X),onNewQuery:()=>le(r,s.database)}):null}case"table":return(0,C.jsx)(rn,{t:e,tab:s,engine:U(s.connectionId),notify:E,onNewQuery:()=>le(r,s.database)});case"sql":return(0,C.jsx)(sn,{t:e,tab:s,tables:n.catalog.relationsOf(`${s.connectionId}|${s.database}|`).map(N=>N.name),notify:E,onSaved:()=>{n.queries.load()}});case"relations":return(0,C.jsx)(Yt,{t:e,store:n,connectionId:s.connectionId,database:s.database,schema:s.schema,kind:s.relation,onOpen:N=>{r&&F(r,s.database,s.schema,N)},onQuery:N=>le(r,s.database,on(U(s.connectionId),N.name)),onNewQuery:()=>le(r,s.database),notify:E});case"routines":return(0,C.jsx)(en,{t:e,store:n,connectionId:s.connectionId,database:s.database,schema:s.schema});case"accounts":return(0,C.jsx)(tn,{t:e,store:n,connectionId:s.connectionId});case"queries":return(0,C.jsx)(nn,{t:e,store:n,onOpen:z,notify:E});case"redis":return(0,C.jsx)(an,{t:e,tab:s,notify:E});default:return null}})();return(0,C.jsx)("div",{className:"dg-pane",style:{display:s.id===i.activeId?"contents":"none"},"aria-hidden":s.id!==i.activeId,children:p},s.id)}),ge=(0,C.jsxs)("div",{className:"dg-status",children:[a.activeId?(0,C.jsxs)("span",{className:"dg-status-item",children:[(0,C.jsx)(T,{name:"database",size:10}),(0,C.jsx)("b",{children:B(a.activeId)?.name??""}),(0,C.jsx)("span",{children:n.connections.session(a.activeId).version||B(a.activeId)?.engine||""})]}):(0,C.jsx)("span",{className:"dg-status-item",children:e("selectConnection")}),g?(0,C.jsxs)("span",{className:"dg-status-item",children:[(0,C.jsx)("span",{children:g.database}),g.schema?(0,C.jsxs)("span",{children:["\xB7 ",g.schema]}):null]}):null,(0,C.jsx)("div",{className:"dg-spacer"}),V.length>0?(0,C.jsxs)("span",{className:"dg-status-item",children:[e("boundProject"),": ",V.length]}):null,(0,C.jsx)("span",{className:"dg-status-item",children:de?de.kind:"ready"})]});return(0,C.jsxs)("div",{className:"dg-root",children:[(0,C.jsx)("style",{children:Xt}),me,l.error?(0,C.jsx)(ue,{tone:"error",onClose:()=>{n.meta.load()},children:l.error}):null,(0,C.jsxs)("div",{className:"dg-body",children:[(0,C.jsx)("div",{style:{width:A,flex:`0 0 ${A}px`,display:"flex",minWidth:0},children:(0,C.jsx)(dn,{store:n,t:e,selectedDatabaseKey:G,onSelectDatabase:Q,onOpenTable:(s,r,p,N)=>F(s,r.name,p,N),onConnectionMenu:Y,onDatabaseMenu:R,onNewQuery:(s,r)=>le(s,r.name)})}),(0,C.jsx)(Ut,{width:A,setWidth:L,min:200,max:420}),(0,C.jsxs)("div",{className:"dg-main",children:[y,i.tabs.length===0?(0,C.jsx)(ye,{title:e("selectConnection"),hint:e("agentHint"),children:(0,C.jsxs)("div",{className:"dg-welcome-actions",children:[(0,C.jsxs)(K,{className:"dg-btn-new-conn",onClick:()=>h({kind:"connection"}),children:[(0,C.jsx)(T,{name:"plus",size:11}),e("newConnection")]}),(0,C.jsxs)(K,{variant:"ghost",onClick:()=>h({kind:"workspaces"}),children:[(0,C.jsx)(T,{name:"link",size:11}),e("workspaces")]})]})}):null,D,H?(0,C.jsxs)("div",{className:`dg-toast${H.tone==="error"?" dg-toast-error":""}`,children:[(0,C.jsx)(T,{name:H.tone==="error"?"alert":"check",size:11}),(0,C.jsx)("span",{className:"dg-truncate",children:H.message})]}):null]})]}),ge,m&&m.kind==="connection"?(0,C.jsx)(_t,{t:e,engines:l.meta?.engines??[],initial:m.initial??null,onClose:()=>h(null),onSave:I}):null,m&&m.kind==="workspaces"?(0,C.jsx)(Gt,{t:e,store:n,onClose:()=>h(null),notify:E}):null,S?(0,C.jsx)(Be,{x:window.innerWidth/2,y:window.innerHeight/2,onClose:()=>q(null),items:[{label:e("confirmDeleteConnection"),disabled:!0},{separator:!0},{label:e("cancel"),onClick:()=>q(null)},{label:e("delete"),icon:"trash",danger:!0,onClick:()=>{let s=S;q(null),n.connections.remove(s.id).catch(r=>E(r instanceof Error?r.message:String(r),"error"))}}]}):null,W?(0,C.jsx)(Be,{x:W.x,y:W.y,items:W.items,onClose:()=>w(null)}):null]})}var Me=require("react/jsx-runtime"),tt="grid",cn="grid";function jn({size:t=20,active:e}){return(0,Me.jsxs)("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,focusable:"false",children:[(0,Me.jsx)("ellipse",{cx:"12",cy:"5.6",rx:"7.1",ry:"2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Me.jsx)("path",{d:"M4.9 5.6v12.8c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9V5.6",stroke:"currentColor",strokeWidth:1.5,strokeLinecap:"round"}),(0,Me.jsx)("path",{d:"M4.9 9.9c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Me.jsx)("path",{d:"M4.9 14.2c0 1.6 3.18 2.9 7.1 2.9s7.1-1.3 7.1-2.9",stroke:"currentColor",strokeWidth:1.5}),(0,Me.jsx)("rect",{x:"10.55",y:"9.55",width:"2.9",height:"10.9",rx:"1.2",fill:"var(--dsw-alias-brand-primary)",opacity:e===!1?.55:.9})]})}function Qn(t){t.effect(()=>t.locale.register(tt,Pt),"grid: dictionaries");let e=t.locale.bind(tt);t.slots.inject("main",()=>t.slots.register({name:"main",key:cn,locale:tt},ln)),t.slots.inject("sidebar.panellist",()=>t.slots.register({name:"sidebar.panellist",id:cn,order:15,label:()=>e("panel"),locale:tt},jn))}var Vn={inject:["slots","locale"],apply:Qn};

    return module.exports.default || module.exports;
  },
});
