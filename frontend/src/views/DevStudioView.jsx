import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Cpu, Upload, Plus, GitBranch, Layers, CheckCircle, Package, Edit, Sparkles } from 'lucide-react';

export default function DevStudioView() {
  const { activeGame, refreshGames, addToast } = useAuth();
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Version bump form
  const [bumpVersion, setBumpVersion] = useState('');
  const [bumpBuild, setBumpBuild] = useState(0);
  const [bumping, setBumping] = useState(false);

  // New Content / DLC form
  const [showContentModal, setShowContentModal] = useState(false);
  const [cType, setCType] = useState('SKIN_PACK');
  const [cData, setCData] = useState('{"assets": ["mesh_01", "texture_02"]}');
  const [cVer, setCVer] = useState('1.0.0');
  const [cActive, setCActive] = useState(true);
  const [savingContent, setSavingContent] = useState(false);

  // Game Metadata Editor
  const [gameName, setGameName] = useState('');
  const [gameDesc, setGameDesc] = useState('');
  const [gameType, setGameType] = useState('Action');
  const [minAge, setMinAge] = useState(13);
  const [gameConfig, setGameConfig] = useState('{}');
  const [savingMeta, setSavingMeta] = useState(false);

  useEffect(() => {
    if (activeGame) {
      setBumpVersion(activeGame.version || '1.0.0');
      setBumpBuild(activeGame.buildNumber || 1);
      setGameName(activeGame.gameName || '');
      setGameDesc(activeGame.description || '');
      setGameType(activeGame.gameType || 'Action');
      setMinAge(activeGame.minimumAge || 13);
      setGameConfig(activeGame.configuration || '{}');

      // Fetch Game Content/DLCs
      setLoading(true);
      api.games.getContent(activeGame.id)
        .then((res) => setContents(res || []))
        .catch(() => setContents([]))
        .finally(() => setLoading(false));
    }
  }, [activeGame]);

  const handleBumpVersion = async (e) => {
    e.preventDefault();
    if (!activeGame) return;
    setBumping(true);
    try {
      await api.games.updateVersion(activeGame.id, {
        version: bumpVersion,
        buildNumber: Number(bumpBuild)
      });
      addToast(`Game updated to version ${bumpVersion} (Build #${bumpBuild})`, 'success');
      await refreshGames();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setBumping(false);
    }
  };

  const handleSaveMetadata = async (e) => {
    e.preventDefault();
    if (!activeGame) return;
    setSavingMeta(true);
    try {
      await api.games.update(activeGame.id, {
        gameName,
        gameType,
        description: gameDesc,
        version: activeGame.version,
        buildNumber: activeGame.buildNumber,
        status: activeGame.status,
        configuration: gameConfig,
        minimumAge: Number(minAge)
      });
      addToast('Game configuration saved successfully', 'success');
      await refreshGames();
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingMeta(false);
    }
  };

  const handleCreateContent = async (e) => {
    e.preventDefault();
    if (!activeGame) return;
    setSavingContent(true);
    try {
      await api.games.addContent(activeGame.id, {
        contentType: cType,
        contentData: cData,
        version: cVer,
        releaseDate: new Date().toISOString(),
        active: cActive
      });
      addToast('DLC content asset registered in database', 'success');
      setShowContentModal(false);
      const updated = await api.games.getContent(activeGame.id);
      setContents(updated || []);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSavingContent(false);
    }
  };

  const handleToggleContent = async (content) => {
    try {
      await api.games.updateContent(content.id, {
        contentType: content.contentType,
        contentData: content.contentData,
        version: content.version,
        releaseDate: content.releaseDate,
        active: !content.active
      });
      addToast(`Content ${content.active ? 'deactivated' : 'activated'}`, 'info');
      const updated = await api.games.getContent(activeGame.id);
      setContents(updated || []);
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  if (!activeGame) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
        <h3>Please select a game first from the top navbar.</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '28px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <span className="badge badge-purple">DEVELOPER SUITE</span>
          <span className="badge badge-cyan">{activeGame.gameName}</span>
        </div>
        <h2 style={{ fontSize: '1.8rem' }}>Game Studio & DLC Asset Manager</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          Configure live titles, bump client build numbers, and deploy downloadable content (DLC) patches.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Version & Release Controls */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <GitBranch size={18} color="var(--primary)" />
            <span>Release & Version Deployment</span>
          </h3>

          <form onSubmit={handleBumpVersion}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Client Version</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={bumpVersion}
                  onChange={(e) => setBumpVersion(e.target.value)}
                  placeholder="1.2.1"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Build Number</label>
                <input
                  type="number"
                  required
                  className="form-input"
                  value={bumpBuild}
                  onChange={(e) => setBumpBuild(e.target.value)}
                />
              </div>
            </div>

            <div style={{
              padding: 12,
              borderRadius: 'var(--radius-md)',
              background: 'rgba(0,0,0,0.3)',
              marginBottom: 16,
              fontSize: '0.78rem',
              color: 'var(--text-dim)'
            }}>
              Current Deployed: <b>v{activeGame.version}</b> (Build #{activeGame.buildNumber}) • Status: <b>{activeGame.status}</b>
            </div>

            <button type="submit" disabled={bumping} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              <Upload size={14} />
              <span>{bumping ? 'Deploying...' : 'Deploy Version Bump'}</span>
            </button>
          </form>
        </div>

        {/* Game Metadata & JSON Config */}
        <div className="glass-panel" style={{ padding: 24 }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Edit size={18} color="var(--warning)" />
            <span>Metadata & Engine Configuration</span>
          </h3>

          <form onSubmit={handleSaveMetadata}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                required
                className="form-input"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  className="form-input"
                  value={gameType}
                  onChange={(e) => setGameType(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Min Age</label>
                <input
                  type="number"
                  className="form-input"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={savingMeta} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              <span>{savingMeta ? 'Saving...' : 'Update Metadata'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Content / DLCs Manager */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Package size={18} color="var(--primary)" />
            <h3 style={{ fontSize: '1.15rem' }}>Game Content & DLC Packages ({contents.length})</h3>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowContentModal(true)}>
            <Plus size={14} />
            <span>Add Content Patch</span>
          </button>
        </div>

        {contents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 12px', color: 'var(--text-dim)' }}>
            <Package size={32} style={{ opacity: 0.5, marginBottom: 8 }} />
            <p>No downloadable content patches or asset bundles registered yet.</p>
          </div>
        ) : (
          <div className="table-container">
            <table className="cyber-table">
              <thead>
                <tr>
                  <th>Content ID</th>
                  <th>Type</th>
                  <th>Version</th>
                  <th>Data Spec</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contents.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <code style={{ color: 'var(--primary)' }}>{c.id.substring(0, 8)}</code>
                    </td>
                    <td>
                      <span className="badge badge-purple">{c.contentType}</span>
                    </td>
                    <td>v{c.version}</td>
                    <td>
                      <code style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>
                        {c.contentData?.length > 40 ? `${c.contentData.substring(0, 40)}...` : c.contentData}
                      </code>
                    </td>
                    <td>
                      <span className={`badge ${c.active ? 'badge-green' : 'badge-amber'}`}>
                        {c.active ? 'LIVE / ACTIVE' : 'INACTIVE'}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleContent(c)}
                        className={`btn btn-sm ${c.active ? 'btn-secondary' : 'btn-primary'}`}
                        style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                      >
                        {c.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Content Modal */}
      {showContentModal && (
        <div className="modal-backdrop" onClick={() => setShowContentModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.15rem' }}>Publish Content Asset</h3>
              <button onClick={() => setShowContentModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)' }}>
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateContent}>
              <div className="modal-body">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Content Type</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={cType}
                      onChange={(e) => setCType(e.target.value)}
                      placeholder="SKIN_PACK, MAP, AUDIO_FX"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Content Version</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      value={cVer}
                      onChange={(e) => setCVer(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Content Data Payload (JSON / URL / Asset Keys)</label>
                  <textarea
                    rows={3}
                    required
                    className="form-textarea"
                    value={cData}
                    onChange={(e) => setCData(e.target.value)}
                  />
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={cActive}
                    onChange={(e) => setCActive(e.target.checked)}
                  />
                  <span>Publish as Active immediately</span>
                </label>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowContentModal(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={savingContent} className="btn btn-primary btn-sm">
                  {savingContent ? 'Publishing...' : 'Register DLC Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
